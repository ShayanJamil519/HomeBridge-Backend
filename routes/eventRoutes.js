const EventController = require("../controllers/eventController");
const {
  isAuthenticatedUser,
  authorizeAdmin,
} = require("../utils/authMiddlewares");
const router = require("express").Router();

// Users

router.get("/api/getAllEventsWebsite", EventController.getAllEventsWebsite);
router.get(
  "/api/getAllEventsAdminPanel",
  EventController.getAllEventsAdminPanel
);
router.get("/api/getSingleEvent/:eventId", EventController.getSingleEvent);

// Admin
router.post(
  "/api/eventRegistration",
  isAuthenticatedUser,
  authorizeAdmin,
  EventController.eventRegistration
);
router.put(
  "/api/editEventRegistration/:eventId",
  isAuthenticatedUser,
  authorizeAdmin,
  EventController.editEventRegistration
);
router.delete(
  "/api/deleteEventRegistration/:eventId",
  isAuthenticatedUser,
  authorizeAdmin,
  EventController.deleteEventRegistration
);

module.exports = router;
