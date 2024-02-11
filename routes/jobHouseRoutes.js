const {
  addJobAndHouseAnnouncement,
  getAllJobAndHouseAnnouncement,
  getSingleJobAndHouseAnnouncement,
  getAllJobAndHouseAnnouncementWebsite,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/jobHouseController");
const {
  authorizeAdmin,
  isAuthenticatedUser,
} = require("../utils/authMiddlewares");
const router = require("express").Router();

router.post(
  "/api/job_house/createAnnouncement",
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
  // isAuthenticatedUser,
  getAllJobAndHouseAnnouncementWebsite
);

router.get(
  "/api/job_house/announcement",
  // isAuthenticatedUser,
  getSingleJobAndHouseAnnouncement
);

router.put(
  "/api/job_house/updateAnnouncement",
  authorizeAdmin,
  updateAnnouncement
);
router.delete(
  "/api/job_house/deleteAnnouncement",
  authorizeAdmin,
  deleteAnnouncement
);

module.exports = router;
