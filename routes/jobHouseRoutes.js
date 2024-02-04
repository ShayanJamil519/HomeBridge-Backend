const {
  addJobAndHouseAnnouncement,
  getAllJobAndHouseAnnouncement,
  getSingleJobAndHouseAnnouncement,
  getAllJobAndHouseAnnouncementWebsite,
} = require("../controllers/jobHouseController");
const {
  authorizeAdmin,
  isAuthenticatedUser,
} = require("../utils/authMiddlewares");
const router = require("express").Router();

router.post(
  "/api/job_house/createAnnouncement",
  isAuthenticatedUser,
  authorizeAdmin,
  addJobAndHouseAnnouncement
);
router.get(
  "/api/job_house/allAnnouncements",
  isAuthenticatedUser,
  getAllJobAndHouseAnnouncement
);

router.get(
  "/api/job_house/allWebsiteAnnouncements",
  isAuthenticatedUser,
  getAllJobAndHouseAnnouncementWebsite
);

router.get(
  "/api/job_house/announcement",
  isAuthenticatedUser,
  getSingleJobAndHouseAnnouncement
);

module.exports = router;
