const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
    minlength: [3, "Full name must be at least 3 characters long"],
    maxlength: [100, "Full name is too long"],
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
});

module.exports = mongoose.model("User", userSchema);
