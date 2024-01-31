const EventApplicationModel = require("../models/eventApplicationModel");
const EventModel = require("../models/eventModel");

// Creates New Event Application
module.exports.createEventApplication = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, message } = req.body;
    const { eventId } = req.params;

    // Check if the event exists
    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(400).json({
        status: false,
        message: "Event not found",
      });
    }

    // Check if the user has already applied to this event
    const existingApplication = await EventApplicationModel.findOne({
      user: req.user._id,
      event: eventId,
    });

    if (existingApplication) {
      return res.status(400).json({
        status: false,
        message: "You have already applied to this event",
      });
    }

    const newEventApplication = await EventApplicationModel.create({
      user: req.user.id,
      event: eventId,
      name,
      phoneNumber,
      email,
      applicationDate: new Date(),
      message,
    });

    return res.json({
      status: true,
      message: "Event application submitted",
      eventApplication: newEventApplication,
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};
