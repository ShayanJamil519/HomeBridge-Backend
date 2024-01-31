const JobHouse = require("../models/jobHouseModel");

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
