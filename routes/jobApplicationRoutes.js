const {
  createApplication,
  getAllApplications,
  getSingleApplication,
} = require("../controllers/jobApplicationController");
const {
  authorizeAdmin,
  isAuthenticatedUser,
} = require("../utils/authMiddlewares");
const router = require("express").Router();

router.post(
  "/api/job_house_application/createApplication",
  isAuthenticatedUser,
  createApplication
);
router.get(
  "/api/job_house_application/allApplications",
  isAuthenticatedUser,
  getAllApplications
);
router.get(
  "/api/job_house_application/application",
  isAuthenticatedUser,
  getSingleApplication
);

module.exports = router;
