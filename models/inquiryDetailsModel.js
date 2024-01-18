const mongoose = require("mongoose");

const inquiryDetailsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  message: String,
  applicationDate: Date,
});

module.exports = mongoose.model("InquiryDetails", inquiryDetailsSchema);
