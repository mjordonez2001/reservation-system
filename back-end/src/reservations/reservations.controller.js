const service = require("./reservations.service");
const asyncError = require("../errors/asyncErrorBoundary");

// list function that lists all reservations
async function list(request, response) {
  const data = await service.list();
  response.json({ data: data });
}

// create function that creates a new reservation
async function create(request, response, next) {
  const data = await service.create(request.body.data);
  if (data) return response.status(201).json({ data: data })

  next({
    status: 400,
    message: "Something went wrong!"
  })
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

// validates that data has all required properties
function hasRequiredProperties(request, response, next) {
  const data = request.body.data;
  if (!data) next({ status: 400, message: "Data is required." })

  required_properties.forEach((property) => {
    const value = data[property];
    if (!value || value === "") {
      next ({
        status: 400,
        message: `A ${property} property is required.`
      })
    }
  })
  next();
}

// validates that the properties in request.data are all valid
function validProperties(request, response, next) {
  const data = request.body.data;

  // verifies that that the reservation date is a valid date
  if (!(data.reservation_date.match(/\d{4}-\d{2}-\d{2}/))) {
    next({ status: 400, message: "Invalid reservation_date." })
  }

  // verifies that the reservation time is a valid time
  if (!(data.reservation_time.match(/\d{2}:\d{2}:\d{2}/)) && !(data.reservation_time.match(/\d{2}:\d{2}/))) {
     next({ status: 400, message: "Invalid reservation_time." })
  }

  // verifies that the number of people is a number
  if (typeof data.people !== "number") {
    next({ status: 400, message: "Invalid number of people." })
  }

  next();
}


module.exports = {
  list: asyncError(list),
  create: [asyncError(hasRequiredProperties), asyncError(validProperties), asyncError(create)],
};
