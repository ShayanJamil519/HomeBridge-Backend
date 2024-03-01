const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const userModel = require("../models/userModel");
const crypto = require("crypto");
const { createTransport } = require("nodemailer");
const jwt = require("jsonwebtoken");

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

    const confirmationToken = jwt.sign({ email }, process.env.JWT_SECRET);

    const newUser = await userModel.create({
      userName,
      email,
      password: hashedPassword,
    });

    try {
      // Send a password reset email
      let transporter = createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      let mailOptions = {
        to: newUser.email,
        from: process.env.NODEMAILER_EMAIL,
        subject: "Confirmation Email",
        text: `Thank you for signing up with our platform!\n
          To complete the registration process, please click on the following link or paste it into your browser:\n
          ${process.env.FRONTEND_URL}/auth/confirm-email/${confirmationToken}\n
          If you have not signed up for our platform, you can ignore this email.\n
          We're excited to have you on board!\n`,
      };

      // console.log("transporter: ", transporter);
      await transporter.sendMail(mailOptions);
      return res.json({
        status: true,
        message: "A confirmation email has been sent to your email address.",
      });
    } catch (error) {
      return res.json({
        status: false,
        message: error.message,
      });
    }
  } catch (ex) {
    return res.json({ status: false, message: ex.message });
  }
};

module.exports.confirmEmail = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    // Update the user's emailConfirmed status
    const user = await userModel.findOneAndUpdate(
      { email },
      { emailConfirmed: true },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User not found." });
    }

    // Redirect the user or send a success response
    res.json({ status: true, message: "Email confirmed successfully!" });
  } catch (error) {
    console.log("error: ", error);
    res
      .status(400)
      .json({ status: false, message: "Invalid or expired token." });
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

    if (!user.emailConfirmed) {
      return res.json({
        status: false,
        message:
          "This email is not verified. Confirmation mail is already sent",
      });
    }

    return res.json({
      status: true,
      message: "Login Successfull",
      user: {
        userId: user._id,
        userName: user.userName,
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
    if (!user.emailConfirmed) {
      return res.json({
        status: false,
        message:
          "This email is not verified. Confirmation mail is already sent",
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

module.exports.forgotPassword = async (req, res, next) => {
  try {
    const { email, userName } = req.body;
    if (!email || !userName) {
      return res
        .status(404)
        .json({ status: false, message: "Insufficient Details" });
    }

    const userExists = await User.findOne({ email, userName });

    if (!userExists) {
      return res
        .status(404)
        .json({ status: false, message: "Invalid user name or email" });
    }

    if (!userExists.emailConfirmed) {
      return res.json({
        status: false,
        message:
          "This email is not verified. Confirmation mail is already sent",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour from now

    userExists.passwordResetToken = resetToken;
    userExists.passwordResetExpires = resetExpires;

    await userExists.save();

    try {
      // Send a password reset email
      let transporter = createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      let mailOptions = {
        to: userExists.email,
        from: process.env.NODEMAILER_EMAIL,
        subject: "Password Reset",
        text: `You are receiving this because you have requested the reset of the password for your account.\n
        Please click on the following link, or paste this into your browser to complete the process:\n
        ${process.env.FRONTEND_URL}/auth/new-password/${resetToken}\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      await transporter.sendMail(mailOptions);
      return res.json({
        status: true,
        message: "Password reset email sent!",
      });
    } catch (error) {
      return res.json({
        status: false,
        message: error.message,
      });
    }
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res
        .status(404)
        .json({ status: false, message: "Insufficient Details" });
    }

    const isTokenValid = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    // const userExists = await User.findOne({ email });

    if (!isTokenValid) {
      return res.status(404).json({
        status: false,
        message: "Password reset token is invalid or has expired",
      });
    }

    const isUserFound = await User.findById(isTokenValid._id);

    if (!isUserFound) {
      return res.status(404).json({
        status: false,
        message: "We were unable to find a user for this token",
      });
    }

    if (isUserFound.passwordResetToken !== token) {
      return res.status(404).json({
        status: false,
        message:
          "User token and your token didn't match. You may have a more recent token in your mail list",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    isUserFound.password = hashPassword;
    isUserFound.passwordResetToken = undefined;
    isUserFound.passwordResetExpires = undefined;

    await isUserFound.save();

    return res.json({
      status: true,
      message: "Password has been successfully changed!",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};
