const {
  register,
  login,
  getAllUsers,
  getSingleUser,
  adminLogin,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  isAuthenticatedUser,
  authorizeAdmin,
} = require("../utils/authMiddlewares");
const apiUrl = require("../utils/baseUrl");

const router = require("express").Router();

router.post("/api/user/createUser", register);
router.post("/api/user/login", login);
router.post("/api/user/adminLogin", adminLogin);
router.get(
  "/api/user/allUsers",
  isAuthenticatedUser,
  authorizeAdmin,
  getAllUsers
);
router.get("/api/user", isAuthenticatedUser, getSingleUser);
router.put(
  "/api/user/updateUser",
  isAuthenticatedUser,
  authorizeAdmin,
  updateUser
);
router.delete(
  "/api/user/deleteUser",
  isAuthenticatedUser,
  authorizeAdmin,
  deleteUser
);

module.exports = router;
