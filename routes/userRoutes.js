const {
  register,
  login,
  getAllUsers,
  getSingleUser,
  adminLogin,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../utils/authMiddlewares");
const apiUrl = require("../utils/baseUrl");

const router = require("express").Router();

router.post("/api/user/createUser", register);
router.post("/api/user/login", login);
router.post("/api/user/adminLogin", adminLogin);
router.get("/api/user/allUsers", getAllUsers);
router.get("/api/user/:id", isAuthenticatedUser, getSingleUser);

module.exports = router;
