const mongoose = require("mongoose");

const jobApplicationModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobHouse",
  },
  membershipNumber: String,
  name: String,
  gender: String,
  nationality: String,
  phoneNumber: String,
  email: String,
  applicationDate: Date,
});

module.exports = mongoose.model("JobApplication", jobApplicationModel);
