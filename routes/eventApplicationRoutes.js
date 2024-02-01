const EventApplicationController = require("../controllers/eventApplicationController");
const {
  isAuthenticatedUser,
  authorizeAdmin,
} = require("../utils/authMiddlewares");
const router = require("express").Router();

router.post(
  "/api/createEventApplication/:eventId",
  isAuthenticatedUser,
  EventApplicationController.createEventApplication
);

// Get All Application (Admin)
router.get(
  "/api/getAllApplications/:eventId",
  isAuthenticatedUser,
  authorizeAdmin,
  EventApplicationController.getAllApplications
);

// Get Single Application (Admin)
router.get(
  "/api/getSingleApplication/:applicationId",
  isAuthenticatedUser,
  authorizeAdmin,
  EventApplicationController.getSingleApplication
);

// Get All Applications of a particular event (Admin)
router.get(
  "/api/getAllApplicationsOfEvent/:eventId",
  isAuthenticatedUser,
  authorizeAdmin,
  EventApplicationController.getAllApplicationsOfEvent
);

// Get Single Application of a particular event (Admin)
router.get(
  "/api/getSingleApplicationOfEvent/event/:eventId/application/:applicationId",
  isAuthenticatedUser,
  authorizeAdmin,
  EventApplicationController.getSingleApplicationOfEvent
);

module.exports = router;
