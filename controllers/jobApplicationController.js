const JobApplication = require("../models/jobHouseApplicationModel");

module.exports.createApplication = async (req, res, next) => {
  try {
    const isApplicationExists = await JobApplication.findOne({
      job: req.body.job.toString(),
      user: req.body.user.toString(),
    });
    if (isApplicationExists) {
      return res.status(500).json({
        status: false,
        message: "Your application already exists on this job",
      });
    }
    const application = await JobApplication.create(req.body);

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

    const application = await JobApplication.findById(id);
    if (!application) {
      return res
        .status(404)
        .json({ status: false, message: "No Record Found" });
    }

    await JobApplication.findByIdAndUpdate(id, req.body, {
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

    const application = await JobApplication.findById(id);
    if (!application) {
      return res
        .status(404)
        .json({ status: false, message: "No Record Found" });
    }

    await JobApplication.findByIdAndDelete(id);

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
    const applications = await JobApplication.find();
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

module.exports.getMyApplications = async (req, res, next) => {
  try {
    const applications = await JobApplication.find({ user: req.user }).populate(
      "job",
      "isAccomodated announcementName salary rent"
    );

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

    const application = await JobApplication.findById(id);
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
