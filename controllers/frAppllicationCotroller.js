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
module.exports.getAllMyApplications = async (req, res, next) => {
  try {
    const applications = await FRApplication.find({ user: req.user });
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

// module.exports.getAllMyApplications = async (req, res, next) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const applicationsPerPage = parseInt(req.query.applicationsPerPage) || 10;

//     const totalApplications = await FRApplication.countDocuments();

//     if ((page - 1) * applicationsPerPage >= totalApplications) {
//       return res.status(200).json({
//         status: false,
//         message: "No more records",
//       });
//     }

//     const allApplications = await FRApplication.find()
//       .skip((page - 1) * applicationsPerPage)
//       .limit(applicationsPerPage);

//     if (allApplications.length === 0) {
//       return res.status(200).json({
//         status: false,
//         message: "No Record Found",
//       });
//     }

//     let data = {
//       currentPage: page,
//       applicationsPerPage: applicationsPerPage,
//       totalApplications: totalApplications,
//       frApplication: allApplications,
//     };

//     return res.status(200).json({
//       status: true,
//       data: data,
//     });
//   } catch (error) {
//     res.status(500).json({ status: false, message: error.message });
//   }
// };

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
