const InquiryModel = require("../models/inquiryModel");

module.exports.createInquiry = async (req, res, next) => {
  try {
    const application = await InquiryModel.create(req.body);

    return res.json({
      status: true,
      message: "Inquiry submitted successfully!",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.updateInquiry = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res
        .status(404)
        .json({ status: false, message: "Insufficient Details" });
    }

    const application = await InquiryModel.findById(id);
    if (!application) {
      return res
        .status(404)
        .json({ status: false, message: "No Record Found" });
    }

    await InquiryModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json({
      status: true,
      message: "Inquiry updated successfully!",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.deleteInquiry = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res
        .status(404)
        .json({ status: false, message: "Insufficient Details" });
    }

    const application = await InquiryModel.findById(id);
    if (!application) {
      return res
        .status(404)
        .json({ status: false, message: "No Record Found" });
    }

    await InquiryModel.findByIdAndDelete(id);

    return res.json({
      status: true,
      message: "Record deleted successfully!",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.getAllInquiries = async (req, res, next) => {
  try {
    const applications = await InquiryModel.find();
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

module.exports.getSingleInquiry = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res
        .status(404)
        .json({ status: false, message: "Insufficient Details" });
    }

    const application = await InquiryModel.findById(id);
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
