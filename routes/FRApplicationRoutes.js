const {
  createApplication,
  getAllApplications,
  getSingleApplication,
  updateApplication,
  deleteApplication,
  getAllMyApplications,
} = require("../controllers/frAppllicationCotroller");
const {
  authorizeAdmin,
  isAuthenticatedUser,
} = require("../utils/authMiddlewares");
const router = require("express").Router();

router.post(
  "/api/f_2_r/createApplication",
  isAuthenticatedUser,
  createApplication
);
router.put(
  "/api/f_2_r/updateApplication",
  isAuthenticatedUser,
  authorizeAdmin,
  updateApplication
);
router.delete(
  "/api/f_2_r/deleteApplication",
  isAuthenticatedUser,
  authorizeAdmin,
  deleteApplication
);
router.get(
  "/api/f_2_r/allApplications",
  isAuthenticatedUser,
  getAllApplications
);
router.get(
  "/api/f_2_r/myApplications",
  isAuthenticatedUser,
  getAllMyApplications
);
router.get("/api/f_2_r/application", isAuthenticatedUser, getSingleApplication);

module.exports = router;
