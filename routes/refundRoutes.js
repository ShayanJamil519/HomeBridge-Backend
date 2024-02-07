const {
  createRefundRequest,
  updateRefundRequest,
  deleteRefundRequest,
  getAllRefundRequests,
  getSingleRefundRequest,
} = require("../controllers/refundController");
const {
  authorizeAdmin,
  isAuthenticatedUser,
} = require("../utils/authMiddlewares");
const router = require("express").Router();

router.post(
  "/api/refund/createRefundRequest",
  isAuthenticatedUser,
  createRefundRequest
);
router.put(
  "/api/refund/updateRefundRequest",
  isAuthenticatedUser,
  authorizeAdmin,
  updateRefundRequest
);
router.delete(
  "/api/refund/deleteRefundRequest",
  isAuthenticatedUser,
  authorizeAdmin,
  deleteRefundRequest
);
router.get(
  "/api/refund/allRefundRequests",
  isAuthenticatedUser,
  authorizeAdmin,
  getAllRefundRequests
);
router.get(
  "/api/refund/singleRefundRequest",
  isAuthenticatedUser,
  authorizeAdmin,
  getSingleRefundRequest
);

module.exports = router;
