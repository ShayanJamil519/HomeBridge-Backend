const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  price: Number,
  deadline: Date,
  registrationDate: Date,
  productIntroduction: String,
  eventInformation: String,
  productInformation: String,
  schedules: [
    {
      scheduleIntroduction: String,
      daySchedules: [
        {
          detailedSchedule: String,
          scheduleImage: String,
          dayScheduleInfo: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Event", eventSchema);
