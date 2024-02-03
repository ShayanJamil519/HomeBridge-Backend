const {
  createRefundRequest,
  updateRefundRequest,
  deleteRefundRequest,
  getAllRefundRequests,
  getSingleRefundRequest,
} = require("../controllers/paymentController");
const {
  authorizeAdmin,
  isAuthenticatedUser,
} = require("../utils/authMiddlewares");
const router = require("express").Router();

router.post(
  "/api/payment/createRefundRequest",
  isAuthenticatedUser,
  createRefundRequest
);
router.put(
  "/api/payment/updateRefundRequest",
  isAuthenticatedUser,
  authorizeAdmin,
  updateRefundRequest
);
router.delete(
  "/api/payment/deleteRefundRequest",
  isAuthenticatedUser,
  authorizeAdmin,
  deleteRefundRequest
);
router.get(
  "/api/payment/allRefundRequests",
  isAuthenticatedUser,
  getAllRefundRequests
);
router.get(
  "/api/payment/singleRefundRequest",
  isAuthenticatedUser,
  getSingleRefundRequest
);

module.exports = router;
