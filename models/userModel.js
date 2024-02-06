const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "User name is required"],
    trim: true,
    minlength: [3, "User name must be at least 3 characters long"],
    maxlength: [100, "User name is too long"],
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
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordResetToken: { type: String, default: "" },
  passwordResetExpires: { type: Date, default: new Date() },
});

module.exports = mongoose.model("User", userSchema);
