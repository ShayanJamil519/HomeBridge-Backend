const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const userModel = require("../models/userModel");

module.exports.register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Incomplete Details!" });
    }

    const emailCheck = await userModel.findOne({ email });
    if (emailCheck) {
      return res
        .status(409)
        .json({ status: false, message: "Email already in use" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      userName,
      email,
      password: hashedPassword,
    });

    return res.json({ status: true, message: "Registeration Successfull" });
  } catch (ex) {
    return res.json({ status: false, message: ex.message });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        status: false,
        message: "User with this email doesn't exist ",
      });
    }

    let isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({
        message: "Incorrect password",
        status: false,
      });
    }

    return res.json({
      status: true,
      message: "Login Successfull",
      user: {
        userId: user._id,
        token: `Bearer ${generateToken(user._id.toString())}`,
      },
    });
  } catch (ex) {
    return res.json({ status: false, message: ex.message });
  }
};

module.exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        status: false,
        message: "User with this email doesn't exist ",
      });
    }

    let isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({
        message: "Incorrect password",
        status: false,
      });
    }

    if (user.role !== "admin") {
      return res.json({
        message: "You are not admin!",
        status: false,
      });
    }

    return res.json({
      status: true,
      message: "Login Successfull",
      user: {
        userId: user._id,
        token: `Bearer ${generateToken(user._id.toString())}`,
      },
    });
  } catch (ex) {
    return res.json({ status: false, message: ex.message });
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.json({ status: true, data: users });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res
        .status(404)
        .json({ status: false, message: "Insufficient Details" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "No Record Found" });
    }

    return res.json({ status: true, data: user });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res
        .status(404)
        .json({ status: false, message: "Insufficient Details" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "No Record Found" });
    }

    await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json({
      status: true,
      message: "Application updated successfully!",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res
        .status(404)
        .json({ status: false, message: "Insufficient Details" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "No Record Found" });
    }

    await User.findByIdAndDelete(id);

    return res.json({
      status: true,
      message: "Record deleted successfully!",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};
