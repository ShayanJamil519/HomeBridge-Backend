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

    let isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({
        message: "Incorrect password",
        status: false,
      });
    }

    return res.json({
      status: true,
      message: "Login Successfull",
      userId: user._id,
      token: `Bearer ${generateToken(user._id.toString())}`,
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

    let isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({
        message: "Incorrect password",
        status: false,
      });
    }

    if (role !== "admin") {
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

    if (users.length === 0) {
      return res.json({
        status: false,
        message: "No Record Found",
      });
    }

    return res.json({
      status: true,
      users,
    });
  } catch (ex) {
    return res.json({ status: false, message: ex.message });
  }
};

module.exports.getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.json({
        status: false,
        message: "No record found!",
      });
    }

    return res.json({
      status: true,
      user: user,
    });
  } catch (ex) {
    return res.json({ status: false, message: ex.message });
  }
};

// // module.exports.updateUser = async (req, res, next) => {
// //   const { userId } = req.query;
// //   let { userData } = req.body;

// //   console.log("userData: ", userData);

// //   if (!userId) {
// //     return res
// //       .status(400)
// //       .json({ status: false, message: "Insufficient credentials" });
// //   }

// //   try {
// //     const user = await userModel.findById(userId);
// //     if (!user) {
// //       return res.status(404).json({ status: false, message: "User not found" });
// //     }

// //     // Check if image needs to be uploaded
// //     if (typeof userData.image === "string" && userData.image !== "") {
// //       // Assuming image is a base64 string or a new file to be uploaded
// //       const myCloud = await cloudinary.uploader.upload(userData.image, {
// //         folder: "avatars",
// //       });

// //       // Update userData with Cloudinary image info
// //       userData.image = {
// //         public_id: myCloud.public_id,
// //         url: myCloud.secure_url,
// //       };
// //     }

// //     const updatedUser = await userModel.findByIdAndUpdate(userId, userData, {
// //       new: true,
// //     });

// //     return res.json({
// //       status: true,
// //       message: "User details updated successfully",
// //       user: updatedUser,
// //     });
// //   } catch (error) {
// //     console.log("Error in updateUser: ", error);
// //     return res
// //       .status(500)
// //       .json({ status: false, message: "Internal Server Error" });
// //   }
// // };

// module.exports.addFavorite = async (req, res, next) => {
//   const id = req.params.id;
//   const { userId } = req.body;

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ status: false, message: "User not found" });
//     }

//     if (user.favorites.includes(id)) {
//       await User.updateOne({ _id: userId }, { $pull: { favorites: id } });
//       res.status(200).json("Celebrity Unliked successfully");
//     } else {
//       await User.updateOne({ _id: userId }, { $push: { favorites: id } });
//       res.status(200).json("Celebrity Liked successfully");
//     }
//   } catch (ex) {
//     res.status(500).json({ status: false, message: ex.message });
//   }
// };

// module.exports.getFavoriteCelebrities = async (req, res, next) => {
//   try {
//     const userId = req.params.userId;

//     // Find user by ID
//     const user = await User.findById(userId).populate("favorites");

//     if (!user) {
//       return res.status(404).json({ status: false, message: "User not found" });
//     }

//     // Extract favorite celebrities from user
//     const favoriteCelebrities = user.favorites;

//     res.status(200).json({ status: true, data: favoriteCelebrities });
//   } catch (ex) {
//     res.status(500).json({ status: false, message: ex.message });
//   }
// };

// module.exports.getUserById = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ status: false, message: "User not found" });
//     }

//     return res.json({ status: true, data: user });
//   } catch (error) {
//     return res.status(500).json({ status: false, message: error.message });
//   }
// };

// module.exports.googleAuth = async (req, res, next) => {
//   console.log("GoogleAuth:", req.body);
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       return res.json({
//         status: true,
//         message: "Login Successfull",
//         userId: user._id,
//         token: `Bearer ${generateToken(user._id.toString())}`,
//       });
//     } else {
//       const newUser = new User({
//         ...req.body,
//       });
//       const savedUser = await newUser.save();

//       return res.json({
//         status: true,
//         message: "Login Successfull",
//         userId: savedUser._id,
//         token: `Bearer ${generateToken(savedUser._id.toString())}`,
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// };
