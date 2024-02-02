const EventModel = require("../models/eventModel");

// Admin
module.exports.eventRegistration = async (req, res, next) => {
  try {
    const {
      price,
      deadline,
      noOfApplicants,
      productIntroduction,
      eventInformation,
      productInformation,
      schedules,
    } = req.body;

    const newEvent = await EventModel.create({
      price,
      deadline,
      noOfApplicants,
      registrationDate: new Date(),
      productIntroduction,
      eventInformation,
      productInformation,
      schedules,
    });

    return res.status(201).json({
      status: true,
      message: "Event registration successful",
      event: newEvent,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// Admin
module.exports.editEventRegistration = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const existingEvent = await EventModel.findById(eventId);
    if (!existingEvent) {
      return res.status(404).json({
        status: false,
        message: "Event not found",
      });
    }

    const {
      price,
      deadline,
      noOfApplicants,
      productIntroduction,
      eventInformation,
      productInformation,
      schedules,
    } = req.body;

    existingEvent.price = price;
    existingEvent.deadline = deadline;
    existingEvent.noOfApplicants = noOfApplicants;
    existingEvent.productIntroduction = productIntroduction;
    existingEvent.eventInformation = eventInformation;
    existingEvent.productInformation = productInformation;
    existingEvent.schedules = schedules;

    const updatedEvent = await existingEvent.save();

    return res.status(200).json({
      status: true,
      message: "Event registration updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// Admin
module.exports.deleteEventRegistration = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const existingEvent = await EventModel.findById(eventId);
    if (!existingEvent) {
      return res.status(404).json({
        status: false,
        message: "Event not found",
      });
    }

    await existingEvent.remove();

    return res.status(200).json({
      status: true,
      message: "Event registration deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports.getAllEvents = async (req, res, next) => {
  try {
    const allEvents = await EventModel.find();

    if (allEvents.length === 0) {
      return res.status(200).json({
        status: false,
        message: "No Record Found",
      });
    }

    return res.status(200).json({
      status: true,
      events: allEvents,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports.getSingleEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const foundEvent = await EventModel.findById(eventId);

    if (!foundEvent) {
      return res.status(404).json({
        status: false,
        message: "Event not found",
      });
    }

    return res.status(200).json({
      status: true,
      event: foundEvent,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
