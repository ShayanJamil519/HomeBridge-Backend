const {} = require("../controllers/eventApplicationController");
const router = require("express").Router();

router.post("/api/event_application/create/:eventId");

module.exports = router;
