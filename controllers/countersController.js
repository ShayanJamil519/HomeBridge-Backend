const UserModel = require("../models/userModel");
const EventApplicationModel = require("../models/eventApplicationModel");
const JobHouseApplicationModel = require("../models/jobHouseApplicationModel");
const FRApplicationModel = require("../models/frApplicationModel");

// Function to get total count
async function getTotalCount(model, filter = {}) {
  try {
    const count = await model.countDocuments(filter);
    return count;
  } catch (error) {
    console.error("Error fetching total count:", error);
    return error;
  }
}

// Function to get total payment sum for a specific model
async function getTotalPaymentSum(model, filter = {}) {
  try {
    const payments = await model.find(filter).populate({
      path: "event",
      select: "price",
    });
    const sum = payments.reduce(
      (total, payment) => total + payment.event.price,
      0
    );
    return sum;
  } catch (error) {
    console.error("Error fetching total payment sum:", error);
    return error;
  }
}

// API endpoint to get total counts and sums
module.exports.getAllCounters = async (req, res, next) => {
  try {
    const dailyUsers = await getTotalCount(UserModel, {
      createdAt: { $gte: new Date(new Date() - 24 * 60 * 60 * 1000) },
    });
    const monthlyUsers = await getTotalCount(UserModel, {
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    });
    const yearlyUsers = await getTotalCount(UserModel, {
      createdAt: { $gte: new Date(new Date().getFullYear(), 0, 1) },
    });

    const dailyF2RApplications = await getTotalCount(FRApplicationModel, {
      applicationDate: { $gte: new Date(new Date() - 24 * 60 * 60 * 1000) },
    });
    const monthlyF2RApplications = await getTotalCount(FRApplicationModel, {
      applicationDate: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    });
    const yearlyF2RApplications = await getTotalCount(FRApplicationModel, {
      applicationDate: { $gte: new Date(new Date().getFullYear(), 0, 1) },
    });

    const dailyJobHousesApplications = await getTotalCount(
      JobHouseApplicationModel,
      {
        registerationDate: { $gte: new Date(new Date() - 24 * 60 * 60 * 1000) },
      }
    );
    const monthlyJobHousesApplications = await getTotalCount(
      JobHouseApplicationModel,
      {
        registerationDate: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      }
    );
    const yearlyJobHousesApplications = await getTotalCount(
      JobHouseApplicationModel,
      {
        registerationDate: { $gte: new Date(new Date().getFullYear(), 0, 1) },
      }
    );

    const dailyEventApplications = await getTotalCount(EventApplicationModel, {
      applicationDate: { $gte: new Date(new Date() - 24 * 60 * 60 * 1000) },
    });
    const monthlyEventApplications = await getTotalCount(
      EventApplicationModel,
      {
        applicationDate: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      }
    );
    const yearlyEventApplications = await getTotalCount(EventApplicationModel, {
      applicationDate: { $gte: new Date(new Date().getFullYear(), 0, 1) },
    });

    const dailyPaymentSum = await getTotalPaymentSum(EventApplicationModel, {
      applicationDate: { $gte: new Date(new Date() - 24 * 60 * 60 * 1000) },
    });
    const monthlyPaymentSum = await getTotalPaymentSum(EventApplicationModel, {
      applicationDate: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    });
    const yearlyPaymentSum = await getTotalPaymentSum(EventApplicationModel, {
      applicationDate: { $gte: new Date(new Date().getFullYear(), 0, 1) },
    });

    return res.json({
      status: true,
      data: {
        dailyUsers,
        monthlyUsers,
        yearlyUsers,
        dailyF2RApplications,
        monthlyF2RApplications,
        yearlyF2RApplications,
        dailyJobHousesApplications,
        monthlyJobHousesApplications,
        yearlyJobHousesApplications,
        dailyEventApplications,
        monthlyEventApplications,
        yearlyEventApplications,
        dailyPaymentSum,
        monthlyPaymentSum,
        yearlyPaymentSum,
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
