const knex = require("../db/connection");

// knex query that lists all tables in the tables table sorted by table_name
function list() {
  return knex("tables")
    .select("*")
    .orderBy("table_name");
} 

// knex query that returns the table from the given table_id
function read(table_id) {
  return knex("tables")
    .select("*")
    .where({ "table_id": table_id })
    .first();
}

// knex query that creates a new table
async function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

// knex query that updates a table with a new reservation_id
function update(updatedTable) {
  return knex("tables")
    .where({ "table_id": updatedTable.table_id })
    .update(updatedTable, "*");
}

module.exports = {
  list,
  read,
  create,
  update
}