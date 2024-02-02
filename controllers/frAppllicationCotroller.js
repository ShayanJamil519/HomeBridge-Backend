const FRApplication = require("../models/frApplicationModel");

module.exports.createApplication = async (req, res, next) => {
  try {
    const application = await FRApplication.create(req.body);

    return res.json({
      status: true,
      message: "Application created successfully!",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.updateApplication = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res
        .status(404)
        .json({ status: false, message: "Insufficient Details" });
    }

    const application = await FRApplication.findById(id);
    if (!application) {
      return res
        .status(404)
        .json({ status: false, message: "No Record Found" });
    }

    await FRApplication.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json({
      status: true,
      message: "Application updated successfully!",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res
        .status(404)
        .json({ status: false, message: "Insufficient Details" });
    }

    const application = await FRApplication.findById(id);
    if (!application) {
      return res
        .status(404)
        .json({ status: false, message: "No Record Found" });
    }

    await FRApplication.findByIdAndDelete(id);

    return res.json({
      status: true,
      message: "Record deleted successfully!",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.getAllApplications = async (req, res, next) => {
  try {
    const applications = await FRApplication.find();
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

module.exports.getSingleApplication = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res
        .status(404)
        .json({ status: false, message: "Insufficient Details" });
    }

    const application = await FRApplication.findById(id);
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
