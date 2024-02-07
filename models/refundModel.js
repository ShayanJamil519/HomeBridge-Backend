const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // product Number
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  eventApplication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventApplication",
  },
  refundAmount: String,
  refundDate: Date,
  // account details:
  accountNumber: String,
  accountName: String,
  bankName: String,
});

module.exports = mongoose.model("Refund", refundSchema);
