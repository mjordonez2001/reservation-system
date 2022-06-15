const knex = require("../db/connection");

// NOT IN USE
// knex query that lists all reservations in the reservations table
function list() {
  return knex("reservations")
    .select("*");
}

// knex query that lists all reservations for a specific date sorted by time
function listDate(date) {
  return knex("reservations")
    .select("*")
    .orderBy("reservation_time")
    .where({ "reservation_date": date });
}

// knex query that creates a new resevation
async function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

// knex query that returns the reservation from the given reservation_id
function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ "reservation_id": reservation_id })
    .first();
}

module.exports = {
  list,
  listDate,
  create,
  read
}