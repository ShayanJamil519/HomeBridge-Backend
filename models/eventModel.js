const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  price: Number,
  eventImages: [{ type: String }],
  registrationDate: { type: Date, default: Date.now },
  productIntroduction: String,
  productDescription: String,
  departure: Date,
  arrival: Date,
  deadline: Date,
  traffic: String,
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
