const mongoose = require("mongoose");

const paymentDetailsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  membershipNumber: String,
  paymentNumber: String,
  eventProductNumber: String,
  productPrice: Number,
  paymentMethod: String,
  paymentDate: Date,
  situation: String,
});

module.exports = mongoose.model("PaymentDetails", paymentDetailsSchema);
