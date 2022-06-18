const service = require("./tables.service");
const asyncError = require("../errors/asyncErrorBoundary");
const { as } = require("../db/connection");

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
  if (data) return response.status(201).json({ data: data });
  
  next({ status: 400, message: "Something went wrong!" });
}

// ------------- middleware ------------- //

// all required properties 
const required_properties = [
  "table_name",
  "capacity"
]

// validates that data has all required properties
function hasRequiredProperties(request, reponse, next) {
  const data = request.body.data;
  if (!data) next({ status: 400, message: "Data is required." });

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

// validates that the table_id exists
async function tableExists(request, response, next) {
  const data = await service.read(request.params.table_id);
  if (data) {
    response.locals.table = data;
    next();
  }

  next({ status: 404, message: `Table ${request.params.table_id} does not exist` });
}

module.exports = {
  list: asyncError(list),
  read: [asyncError(tableExists), asyncError(read)],
  create: [asyncError(hasRequiredProperties), asyncError(validProperties),asyncError(create)]
}