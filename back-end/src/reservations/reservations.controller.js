const service = require("./reservations.service");
const asyncError = require("../errors/asyncErrorBoundary");

// list function that lists all reservations based on the date or mobile number from the query
async function list(request, response, next)  {
  const date = request.query.date;
  const mobile_number = request.query.mobile_number;
  let data;

  if (date) data = await service.listDate(date);
  else if (mobile_number) data = await service.listNumber(mobile_number);
  else next({ status: 400, message: "Please enter a phone number" });
  
  response.status(200).json({ data: data });
}

// create function that creates a new reservation
async function create(request, response) {
  const data = request.body.data;
  // adds a status of booked
  data.status = "booked";

  const reservation = await service.create(data);
  response.status(201).json({ data: reservation });
}

// read function that returns a reservation based on the reservation_id
function read(request, response) {
  const { reservation } = response.locals;
  response.status(200).json({ data: reservation });
}

// update function that updates the properties of a reservation
async function update(request, response) {
  const updateData = request.body.data;
  const reservation_id = request.params.reservation_id;
  const reservation = response.locals.reservation;

  const updatedReservation = {
    ...reservation,
    ...updateData,
    reservation_id: reservation_id
  }
  await service.update(updatedReservation);
  const data = await service.read(reservation_id);

  response.status(200).json({ data: data });
}

// ------------- middleware ------------- //

// all required properties
const required_properties = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
]

// validates that there is data in the body
function hasData(request, response, next) {
  const data = request.body.data;
  if (!data) next({ status: 400, message: "Data is required." });

  next();
}

// validates that data has all required properties
function hasRequiredProperties(request, response, next) {
  const data = request.body.data;

  required_properties.forEach((property) => {
    const value = data[property];
    if (!value || value === "") {
      next ({ status: 400, message: `A ${property} property is required.` });
    }
  })
  next();
}

// validates that the properties in request.data are all valid
function validProperties(request, response, next) {
  const data = request.body.data;
  const today = new Date();
  const date = new Date(`${data.reservation_date} ${data.reservation_time}`);

  // verifies that that the reservation date is a valid date
  if (!(data.reservation_date.match(/\d{4}-\d{2}-\d{2}/))) {
    next({ status: 400, message: "Invalid reservation_date." });
  }

  // verifies that the reservation time is a valid time
  if (!(data.reservation_time.match(/\d{2}:\d{2}:\d{2}/)) && !(data.reservation_time.match(/\d{2}:\d{2}/))) {
     next({ status: 400, message: "Invalid reservation_time." });
  }

  // verifies that the number of people is a number
  if (typeof data.people !== "number") {
    next({ status: 400, message: "Invalid number of people." });
  }

  // verifies that the reservation is set for the future
  if (date < today) {
    next({ status: 400, message: "Reservation date must be in the future." });
  }

  // verifies that the reservation is made between 10:30AM and 9:30PM
  if (
    (date.getHours() < 10 || date.getHours() > 21) || 
    (date.getHours() === 10 && date.getMinutes() < 30) || 
    (date.getHours() === 21 && date.getMinutes() > 30)
    ) {
      next({ status: 400, message: "Reservation time must between 10:30AM and 9:30PM" });
  }
  
  // verifies that the reservation is not made on a tuesday
  if (date.getDay() == 2) {
    next({ status: 400, message: "Restaurant is closed on Tuesdays." });
  }

  // verifies that the reservation status is booked
  if (data.status === "seated") {
    next({ status: 400, message: "Reservation status cannot be set to 'seated'." })
  } else if (data.status === "finished") {
    next({ status: 400, message: "Reservation status cannot be set to 'finished'." })
  }

  next();
}

// validates that reservation_id exists
async function reservationExists(request, response, next) {
  const data = await service.read(request.params.reservation_id);
  if (data) {
    response.locals.reservation = data;
    return next();
  }

  next({ status: 404, message: `Reservation ${request.params.reservation_id} does not exist` });
}

// validates that a status exists for the reservations
function hasValidStatus(request, response, next) {
  const reservation = response.locals.reservation;
  const data = request.body.data;

  // verifies that the status is either booked, seated, finished, or cancelled
  if (data.status !== "booked" && data.status !== "seated" && data.status !== "finished" && data.status !== "cancelled") {
    next({ status: 400, message: "Reservation status is unknown." })
  }

  // verifies that the current status is not finished
  if (reservation.status === "finished") {
    next({ status: 400, message: "Reservation is already finished." })
  }

  next();
}


module.exports = {
  list: asyncError(list),
  create: [asyncError(hasData), asyncError(hasRequiredProperties), asyncError(validProperties), asyncError(create)],
  read: [asyncError(reservationExists), asyncError(read)],
  updateStatus: [asyncError(hasData), asyncError(reservationExists), asyncError(hasValidStatus), asyncError(update)],
  update: [asyncError(hasData), asyncError(reservationExists), asyncError(hasRequiredProperties), asyncError(validProperties), asyncError(update)]
};
