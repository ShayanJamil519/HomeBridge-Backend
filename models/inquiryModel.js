const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  message: String,
  applicationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Inquiry", inquirySchema);
