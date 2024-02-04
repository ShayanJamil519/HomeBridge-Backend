const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productNumber: String,
  productPrice: String,
  paymentMethod: String,
  paymentDate: { type: Date, default: Date.now },
  paymentStatus: String,
  refundDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
