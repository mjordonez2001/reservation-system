const knex = require("../db/connection");

// knex query that lists all tables in the tables table sorted by table_name
function list() {
  return knex("tables")
    .select("*")
    .orderBy("table_name");
} 

module.exports = {
  list
}