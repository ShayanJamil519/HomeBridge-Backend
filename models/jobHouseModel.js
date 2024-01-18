const mongoose = require("mongoose");

const JobHouseSchema = new mongoose.Schema({
  announcementName: String,
  companyName: String,
  jobInfo: String,
  salaryAndBenefits: String,
  jobDetails: String,
  accommodationStatus: Boolean,
  accommodationInfo: String,
  accommodationImage: String,
  generalInfo: String,
  explanation: String,
  externalFeatures: String,
  contractInfo: String,
});

module.exports = mongoose.model("JobHouse", JobHouseSchema);
