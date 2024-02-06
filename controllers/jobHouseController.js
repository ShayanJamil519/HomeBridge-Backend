const JobHouse = require("../models/jobHouseModel");
const JobApplication = require("../models/jobHouseApplicationModel");

module.exports.addJobAndHouseAnnouncement = async (req, res, next) => {
  try {
    const jobAndHouseAnnouncement = await JobHouse.create(req.body);

    return res.json({
      status: true,
      message: "Announcement created successfully!",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.getAllJobAndHouseAnnouncement = async (req, res, next) => {
  try {
    const announcements = await JobHouse.find();

    return res.json({ status: true, data: announcements });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

// Website Paginated
module.exports.getAllJobAndHouseAnnouncementWebsite = async (
  req,
  res,
  next
) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const jobHousePerPage = parseInt(req.query.eventsPerPage) || 8;

    const totalJobHouse = await JobHouse.countDocuments();

    if ((page - 1) * jobHousePerPage >= totalJobHouse) {
      return res.status(200).json({
        status: false,
        message: "No more records",
      });
    }

    const allJobHouse = await JobHouse.find()
      .skip((page - 1) * jobHousePerPage)
      .limit(jobHousePerPage);

    if (allJobHouse.length === 0) {
      return res.status(200).json({
        status: false,
        message: "No Record Found",
      });
    }

    let data = {
      currentPage: page,
      jobHousePerPage: jobHousePerPage,
      totalJobHouse: totalJobHouse,
      jobHouse: allJobHouse,
    };

    return res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports.getSingleJobAndHouseAnnouncement = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res
        .status(404)
        .json({ status: false, message: "Insufficient Details" });
    }

    const announcement = await JobHouse.findById(id);
    if (!announcement) {
      return res
        .status(404)
        .json({ status: false, message: "No Record Found" });
    }

    return res.json({ status: true, data: announcement });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.updateAnnouncement = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res
        .status(404)
        .json({ status: false, message: "Insufficient Details" });
    }

    const announcement = await JobHouse.findById(id);
    if (!announcement) {
      return res
        .status(404)
        .json({ status: false, message: "No Record Found" });
    }

    await JobHouse.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json({
      status: true,
      message: "Announcement updated successfully!",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.deleteAnnouncement = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res
        .status(404)
        .json({ status: false, message: "Insufficient Details" });
    }

    const announcement = await JobHouse.findById(id);
    if (!announcement) {
      return res
        .status(404)
        .json({ status: false, message: "No Record Found" });
    }

    // Delete the job announcement
    await JobHouse.findByIdAndDelete(id);

    // Delete job applications related to the job
    await JobApplication.deleteMany({ job: id });

    return res.json({
      status: true,
      message: "Record deleted successfully!",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};
