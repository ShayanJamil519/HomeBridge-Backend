const {
  createInquiry,
  updateInquiry,
  deleteInquiry,
  getAllInquiries,
  getSingleInquiry,
} = require("../controllers/inquiryController");
const {
  authorizeAdmin,
  isAuthenticatedUser,
} = require("../utils/authMiddlewares");
const router = require("express").Router();

router.post("/api/inquiry/createInquiry", createInquiry);
router.put(
  "/api/inquiry/updateInquiry",
  isAuthenticatedUser,
  authorizeAdmin,
  updateInquiry
);
router.delete(
  "/api/inquiry/deleteInquiry",
  isAuthenticatedUser,
  authorizeAdmin,
  deleteInquiry
);
router.get("/api/inquiry/allInquiries", isAuthenticatedUser, getAllInquiries);
router.get("/api/inquiry/singleInquiry", isAuthenticatedUser, getSingleInquiry);

module.exports = router;
