const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  productIntroduction: String,
  eventInfo: String,
  productInfo: String,
  days: [
    {
      dayNumber: Number,
      scheduleIntroduction: String,
      detailedSchedule: String,
      scheduleImage: String,
      dayScheduleInfo: String,
    },
  ],
});

module.exports = mongoose.model("Event", eventSchema);
