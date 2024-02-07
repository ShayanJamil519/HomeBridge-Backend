const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  paymentMethod: String,
  refundAmount: String,
  // situation ("Complete payment", "Event completed", "Refund completed", "Request for refund")
  paymentStatus: { type: String, default: "Complete payment" },
  refundDate: { type: Date, default: Date.now },
  // account details:
  accountNumber: String,
  accountName: String,
  bankName: String,
});

module.exports = mongoose.model("Payment", paymentSchema);
