const service = require("./tables.service");
const asyncError = require("../errors/asyncErrorBoundary");

// list function that lists all tables 
async function list(request, response) {
  const data = await service.list();
  response.status(200).json({ data: data })
}

// read function that returns a table based on the table_id
function read(request, response) {
  const { table } = response.locals;
  response.status(201).json({ data: table });
}

// ------------- middleware ------------- //

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
}