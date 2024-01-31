const {
  addJobAndHouseAnnouncement,
  getAllJobAndHouseAnnouncement,
  getSingleJobAndHouseAnnouncement,
} = require("../controllers/jobHouseController");
const router = require("express").Router();

router.post("/api/job_house/ceateAnnouncement", addJobAndHouseAnnouncement);
router.get("/api/job_house/allAnnouncements", getAllJobAndHouseAnnouncement);
router.get("/api/job_house/announcement", getSingleJobAndHouseAnnouncement);
// router.get("/api/order/orderDetails", orderDetails);
// router.put("/api/order/orderApproval", approveOrDiscard);
// router.put("/api/order/orderStatus", updateOrderStatus);
// router.post("/api/order/deliverOrder", deliverOrder);

module.exports = router;
