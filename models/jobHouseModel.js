const mongoose = require("mongoose");

const JobHouseSchema = new mongoose.Schema({
  announcementName: String,
  companyName: String,
  jobInfo: String,
  salaryBenefit: String,
  jobDetails: String,
  deadline: String,
  isAccomodated: Boolean,
  accomodationName: String,
  jobHouseimages: [{ type: String }],
  generationInformation: String,
  explanation: String,
  externalFeatures: String,
  contractInformation: String,
  salary: String,
  rent: String,
  deadline: {
    type: String,
    default: "Registering",
  },
  registerationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("JobHouse", JobHouseSchema);
