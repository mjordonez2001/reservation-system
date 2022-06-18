/**
 * Defines the router for table resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./tables.controller");

const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);

router
  .route("/:table_id")
  .get(controller.read)
  .all(methodNotAllowed);

module.exports = router;