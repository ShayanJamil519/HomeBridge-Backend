const CountersController = require("../controllers/countersController");
const { authorizeAdmin } = require("../utils/authMiddlewares");
const router = require("express").Router();

router.get(
  "/api/getAllCounters",
  authorizeAdmin,
  CountersController.getAllCounters
);

module.exports = router;
