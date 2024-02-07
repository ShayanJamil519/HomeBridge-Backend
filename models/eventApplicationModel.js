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
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  },
  name: String,
  phoneNumber: String,
  email: String,
  applicationDate: { type: Date, default: Date.now },
  message: String,
});

module.exports = mongoose.model("EventApplication", eventApplicationSchema);
