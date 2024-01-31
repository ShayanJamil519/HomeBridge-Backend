const mongoose = require("mongoose");

const JobHouseSchema = new mongoose.Schema({
  announcementName: String,
  companyName: String,
  jobInfo: String,
  salaryBenefit: String,
  jobDetails: String,
  isAccomodated: Boolean,
  jobHouseimages: [{ type: String }],
  generationInformation: String,
  explanation: String,
  externalFeatures: String,
  contractInformation: String,
  registerationDate: Date,
});

module.exports = mongoose.model("JobHouse", JobHouseSchema);
