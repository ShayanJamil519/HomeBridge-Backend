const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(" ")[1];

    if (token == null || authHeader == null || authHeader == "") {
      return res
        .status(403)
        .send({ message: "You're not logged in. Please login first" });
    }

    // const verify = jwt.verify(token, `${process.env.JWT_SECRET}`);
    // if (verify) {
    //   req.user = await UserModel.findById(verify);
    //   return next();
    // } else {
    //   return res.status(403).send({ message: "Unauthorized Access" });
    // }
    const verify = jwt.verify(
      token,
      `${process.env.JWT_SECRET}`,
      async (err, decoded) => {
        if (err) {
          // Explicitly handle known errors, e.g., token expired
          return res
            .status(403)
            .send({ message: "Unauthorized Access - Token error" });
        } else {
          // Proceed with user lookup and next middleware
          req.user = await UserModel.findById(decoded.userId); // Assuming userId is stored in the token
          next();
        }
      }
    );
  } catch (error) {
    console.error("err", error);
    res.status(401).send({ message: "Unauthorized" });
  }
};

exports.authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Forbidden: Admin access required" });
  }

  next();
};
