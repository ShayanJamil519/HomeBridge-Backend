const CountersController = require("../controllers/countersController");
const {
  isAuthenticatedUser,
  authorizeAdmin,
} = require("../utils/authMiddlewares");
const router = require("express").Router();

router.get(
  "/api/getAllCounters",
  isAuthenticatedUser,
  authorizeAdmin,
  CountersController.getAllCounters
);

module.exports = router;
