const service = require("./tables.service");
const reservationService = require("../reservations/reservations.service");
const asyncError = require("../errors/asyncErrorBoundary");
const { as, andWhere } = require("../db/connection");

// list function that lists all tables 
async function list(request, response) {
  const data = await service.list();
  response.status(200).json({ data: data })
}

// read function that returns a table based on the table_id
function read(request, response) {
  const { table } = response.locals;
  response.status(200).json({ data: table });
}

// create function that creates a new table
async function create(request, response, next) {
  const data = await service.create(request.body.data);
  response.status(201).json({ data: data });
}

// update function that updates a table by adding a reservation_id
async function update(request, response) {
  const updateData = request.body.data;

  const table_id = request.params.table_id;
  const table = response.locals.table;

  const reservation = response.locals.reservation;
  const reservation_id = reservation.reservation_id;

  // updates the reservation status
  const updatedReservation = {
    ...reservation,
    reservation_id: reservation_id,
    status: "seated"
  }
  await reservationService.update(updatedReservation);

  // updates the table 
  const updatedTable = {
    ...table,
    ...updateData,
    table_id: table_id
  }
  await service.update(updatedTable);
  const data = await service.read(table_id);

  response.status(200).json({ data: data });
}

// delete function that deletes a reservation from a table
async function clearTable(request, response) {
  const table = response.locals.table;
  const table_id = request.params.table_id;

  const reservation_id = table.reservation_id;
  const reservation = await reservationService.read(reservation_id);

  // updates the reservation status
  const updatedReservation = {
    ...reservation,
    reservation_id: reservation_id,
    status: "finished"
  }
  await reservationService.update(updatedReservation);

  // updates the table
  const updatedTable = {
    ...table,
    reservation_id: null
  }
  await service.update(updatedTable);
  const data = await service.read(table_id);

  response.status(200).json({ data: data });
}

// ------------- middleware ------------- //

// all required properties 
const required_properties = [
  "table_name",
  "capacity"
]

// validates that there is data in the body
function hasData(request, response, next) {
  const data = request.body.data;
  if (!data) next({ status: 400, message: "Data is required." });

  next();
}

// validates that data has all required properties
function hasRequiredProperties(request, reponse, next) {
  const data = request.body.data;

  required_properties.forEach((property) => {
    const value = data[property];
    if (!value || value === "") {
      next({ status: 400, message: `A ${property} property is required.` });
    }
  });
  next();
}

// validates that the properties in request.data are all valid
function validProperties(request, response, next) {
  const data = request.body.data;

  // verifies that table_name has more than one character
  if (data.table_name.length < 2) {
    next({ status: 400, message: "The table_name property must have at least two characters." });
  }

  // verifies that capcity is a number
  if (typeof data.capacity !== "number") {
    next({ status: 400, message: "Invalid capacity." });
  }

  next();
}

// validates that the request.body has a reservation_id and that it reservation_id exists
async function reservationExists(request, response, next) {
  const { reservation_id } = request.body.data;

  if (reservation_id) {
    const reservation = await reservationService.read(reservation_id)
    if (reservation) {
      response.locals.reservation = reservation;
      return next();
    }
    else next({ status: 404, message: `Reservation ${reservation_id} does not exist.` });
  }
  
  next({ status: 400, message: `A reservation_id property is required.` })
}

// validates that table is valid and unoccupied for seating a reservation
function validTableReservation(request, response, next) {
  const table = response.locals.table;
  const reservation = response.locals.reservation;

  // verifies that the table is not occupied
  if (table.reservation_id) {
    next({ status: 400, message: `Table ${table.table_id} is occupied.` })
  }

  // verifies that the table has sufficient capacity
  if (table.capacity < reservation.people) {
    next({ status: 400, message: `Table ${table.table_id} does not have sufficient capacity.` });
  }

  // verifies that the reservation status is not already seated
  if (reservation.status === "seated") {
    next({ status: 400, message: "Reservation is already seated." })
  }

  next();
}

// validates that table is occupied when removing a reservertion
function occupiedTable(request, response, next) {
  const table = response.locals.table;

  if (!table.reservation_id) {
    next({ status: 400, message: `Table ${table.table_id} is not occupied.` })
  }

  next();
}

// validates that the table_id exists
async function tableExists(request, response, next) {
  const data = await service.read(request.params.table_id);
  if (data) {
    response.locals.table = data;
    return next();
  }

  next({ status: 404, message: `Table ${request.params.table_id} does not exist.` });
}

module.exports = {
  list: asyncError(list),
  read: [asyncError(tableExists), asyncError(read)],
  create: [asyncError(hasData), asyncError(hasRequiredProperties), asyncError(validProperties),asyncError(create)],
  update: [asyncError(hasData), asyncError(tableExists), asyncError(reservationExists), asyncError(validTableReservation), asyncError(update)],
  clearTable: [asyncError(tableExists), asyncError(occupiedTable), asyncError(clearTable)]
}