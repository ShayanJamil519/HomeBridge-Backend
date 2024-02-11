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
  authorizeAdmin,
  updateRefundRequest
);
router.delete(
  "/api/refund/deleteRefundRequest",
  authorizeAdmin,
  deleteRefundRequest
);
router.get(
  "/api/refund/allRefundRequests",
  authorizeAdmin,
  getAllRefundRequests
);
router.get(
  "/api/refund/singleRefundRequest",
  authorizeAdmin,
  getSingleRefundRequest
);

module.exports = router;
