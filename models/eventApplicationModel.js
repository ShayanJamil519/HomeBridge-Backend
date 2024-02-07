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

  name: String,
  phoneNumber: String,
  paymentMethod: { type: String, default: "Credit Card" },
  // situation ("Complete payment", "Event completed", "Refund completed", "Request for refund")
  paymentStatus: { type: String, default: "Complete payment" },
  email: String,
  applicationDate: { type: Date, default: Date.now },
  message: String,
});

module.exports = mongoose.model("EventApplication", eventApplicationSchema);
