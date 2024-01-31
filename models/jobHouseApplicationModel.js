const mongoose = require("mongoose");

const jobApplicationModel = new mongoose.Schema({
  name: String,
  // membershipNumber: mongdb id,
  gender: String,
  nationality: String,
  phoneNumber: String,
  email: String,
  applicationDate: Date,
  message: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobHouse",
  },
});

module.exports = mongoose.model("JobApplication", jobApplicationModel);
