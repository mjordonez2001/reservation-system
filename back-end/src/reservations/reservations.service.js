const knex = require("../db/connection");

// knex query that lists all reservations in the reservations table
function list() {
  return knex("reservations")
    .select("*");
}

/*
async function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}
*/

module.exports = {
  list,
  //create
}