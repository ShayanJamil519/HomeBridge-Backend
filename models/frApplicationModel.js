const mongoose = require("mongoose");

const frAplicationSchema = new mongoose.Schema({
  name: String,
  gender: String,
  nationality: String,
  address: String,
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
});

module.exports = mongoose.model("FRApplication", frAplicationSchema);
