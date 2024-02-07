const mongoose = require("mongoose");

const jobApplicationModel = new mongoose.Schema({
  name: String,
  gender: String,
  nationality: String,
  phoneNumber: String,
  email: String,
  applicationDate: {
    type: Date,
    default: Date.now,
  },
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
