const {
  createApplication,
  getAllApplications,
  getSingleApplication,
  updateApplication,
  deleteApplication,
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
router.put(
  "/api/job_house_application/updateApplication",
  isAuthenticatedUser,
  authorizeAdmin,
  updateApplication
);
router.delete(
  "/api/job_house_application/deleteApplication",
  isAuthenticatedUser,
  authorizeAdmin,
  deleteApplication
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
