const mongoose = require("mongoose");

const eventApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  membershipNumber: String,
  name: String,
  phoneNumber: String,
  email: String,
  applicationDate: Date,
  message: String,
});

module.exports = mongoose.model("EventApplication", eventApplicationSchema);
