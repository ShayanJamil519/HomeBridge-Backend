const {
  addJobAndHouseAnnouncement,
  getAllJobAndHouseAnnouncement,
  getSingleJobAndHouseAnnouncement,
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
  "/api/job_house/announcement",
  isAuthenticatedUser,
  getSingleJobAndHouseAnnouncement
);
// router.get("/api/order/orderDetails", orderDetails);
// router.put("/api/order/orderApproval", approveOrDiscard);
// router.put("/api/order/orderStatus", updateOrderStatus);
// router.post("/api/order/deliverOrder", deliverOrder);

module.exports = router;
