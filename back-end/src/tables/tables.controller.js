const service = require("./tables.service");
const asyncError = require("../errors/asyncErrorBoundary");

async function list(request, response) {
  const data = await service.list();
  response.status(200).json({ data: data })
}

module.exports = {
  list: asyncError(list)
}