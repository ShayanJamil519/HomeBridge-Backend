const Refund = require("../models/refundModel");
const EventApplication = require("../models/eventApplicationModel");

module.exports.createRefundRequest = async (req, res, next) => {
  try {
    const isRefundApplicationExists = await Refund.findOne({
      user: req.body.user.toString(),
      eventApplication: req.body.eventApplication.toString(),
      event: req.body.event.toString(),
    });

    if (isRefundApplicationExists) {
      return res.status(409).json({
        status: false,
        message:
          "Your refund request is already registered on this event application",
      });
    }
    const refund = await Refund.create(req.body);
    const eventApplication = await EventApplication.findByIdAndUpdate(
      req.body.eventApplication.toString(),
      { paymentStatus: "Request for refund" },
      { new: true }
    );

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

    const application = await Refund.findById(id);
    if (!application) {
      return res
        .status(404)
        .json({ status: false, message: "No Record Found" });
    }

    // console.log("req: ", req.body);

    const updateRefund = await Refund.findByIdAndUpdate(
      id,
      { refundDate: req.body.refundDate || "" },
      { new: true }
    );

    const updateEventApplication = await EventApplication.findByIdAndUpdate(
      req.body.eventApplication._id.toString(),
      { paymentStatus: req.body.eventApplication.paymentStatus },
      { new: true }
    );

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

    const application = await Refund.findById(id);
    if (!application) {
      return res
        .status(404)
        .json({ status: false, message: "No Record Found" });
    }

    await Refund.findByIdAndDelete(id);

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
    const applications = await Refund.find()
      .populate("event")
      .populate("eventApplication");
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

    const application = await Refund.findById(id)
      .populate("event")
      .populate("eventApplication");
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
