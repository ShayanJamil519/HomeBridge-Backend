const {
  register,
  login,
  getAllUsers,
  getSingleUser,
  // updateUser,
  // addFavorite,
  // getFavoriteCelebrities,
  // getUserById,
  // googleAuth,
} = require("../controllers/userController");
const apiUrl = require("../utils/baseUrl");

const router = require("express").Router();

// router.post("/auth/google", googleAuth);
router.post("/api/user/createUser", register);
router.post("/api/user/login", login);
router.get("/api/user/allUsers", getAllUsers);
router.get("/api/user/:id", getSingleUser);

// router.post("/api/user/googleAuth", googleAuth);

// router.get("/api/user/details/:id", getUserById);
// router.put("/api/user/update", updateUser);
// router.put("/api/user/addFavorite/:id", addFavorite);
// router.get("/api/user/favoriteCelebrities/:userId", getFavoriteCelebrities);

module.exports = router;
