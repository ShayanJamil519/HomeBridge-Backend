const Payment = require("../models/paymentModel");

module.exports.createRefundRequest = async (req, res, next) => {
  try {
    const application = await Payment.create(req.body);

    return res.json({
      status: true,
      message: "Refund Request submitted successfully!",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.updateRefundRequest = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res
        .status(404)
        .json({ status: false, message: "Insufficient Details" });
    }

    const application = await Payment.findById(id);
    if (!application) {
      return res
        .status(404)
        .json({ status: false, message: "No Record Found" });
    }

    await Payment.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json({
      status: true,
      message: "Refund Request updated successfully!",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.deleteRefundRequest = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res
        .status(404)
        .json({ status: false, message: "Insufficient Details" });
    }

    const application = await Payment.findById(id);
    if (!application) {
      return res
        .status(404)
        .json({ status: false, message: "No Record Found" });
    }

    await Payment.findByIdAndDelete(id);

    return res.json({
      status: true,
      message: "Record deleted successfully!",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.getAllRefundRequests = async (req, res, next) => {
  try {
    const applications = await Payment.find();
    if (applications.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "No Record Found" });
    }
    return res.json({ status: true, data: applications });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.getSingleRefundRequest = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res
        .status(404)
        .json({ status: false, message: "Insufficient Details" });
    }

    const application = await Payment.findById(id);
    if (!application) {
      return res
        .status(404)
        .json({ status: false, message: "No Record Found" });
    }

    return res.json({ status: true, data: application });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};
