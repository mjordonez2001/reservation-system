const service = require("./reservations.service");
const asyncError = require("../errors/asyncErrorBoundary");

// list function that lists all reservations
async function list(request, respond) {
  const data = await service.list();
  respond.json({ data: data });
}

/*
// create function that creates a new reservation
async function create(request, respond, next) {
  const data = await service.create(request.body.data);
  if (data) return respond(201).json({ data: data })

  next({
    status: 400,
    message: "Something went wrong!"
  })
}
*/

module.exports = {
  list: asyncError(list),
  //create: asyncError(create),
};
