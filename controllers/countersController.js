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

// // Function to get user count by month for a specific year
// async function getUserCountByMonth(model, year) {
//   try {
//     const monthsArray = await model.aggregate([
//       {
//         $match: {
//           createdAt: {
//             $gte: new Date(year, 0, 1),
//             $lt: new Date(year + 1, 0, 1),
//           },
//         },
//       },
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $sort: { _id: 1 }, // Sort by month ascending
//       },
//     ]);

//     // Initialize an array of 12 elements for each month, default to 0
//     let monthlyCounts = new Array(12).fill(0);

//     // Populate the array with counts from the aggregation result
//     monthsArray.forEach((month) => {
//       monthlyCounts[month._id - 1] = month.count; // _id is the month number, array index is month number - 1
//     });

//     return monthlyCounts;
//   } catch (error) {
//     console.error("Error fetching user count by month:", error);
//     return error;
//   }
// }

// General function to get count by month for a specific year and model
async function getCountByMonth(model, year, dateField) {
  try {
    const monthsArray = await model.aggregate([
      {
        $match: {
          [dateField]: {
            $gte: new Date(year, 0, 1),
            $lt: new Date(year + 1, 0, 1),
          },
        },
      },
      {
        $group: {
          _id: { $month: `$${dateField}` },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month ascending
      },
    ]);

    // Initialize an array of 12 elements for each month, default to 0
    let monthlyCounts = new Array(12).fill(0);

    // Populate the array with counts from the aggregation result
    monthsArray.forEach((month) => {
      monthlyCounts[month._id - 1] = month.count; // _id is the month number, array index is month number - 1
    });

    return monthlyCounts;
  } catch (error) {
    console.error("Error fetching count by month:", error);
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
        applicationDate: { $gte: new Date(new Date() - 24 * 60 * 60 * 1000) },
      }
    );
    const monthlyJobHousesApplications = await getTotalCount(
      JobHouseApplicationModel,
      {
        applicationDate: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      }
    );
    const yearlyJobHousesApplications = await getTotalCount(
      JobHouseApplicationModel,
      {
        applicationDate: { $gte: new Date(new Date().getFullYear(), 0, 1) },
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

    const currentYear = new Date().getFullYear();
    const userCountsByMonth = await getCountByMonth(
      UserModel,
      currentYear,
      "createdAt"
    );
    const eventApplicationCountsByMonth = await getCountByMonth(
      EventApplicationModel,
      currentYear,
      "applicationDate"
    );
    const f2rApplicationCountsByMonth = await getCountByMonth(
      FRApplicationModel,
      currentYear,
      "applicationDate"
    );
    const jobHouseCountsByMonth = await getCountByMonth(
      JobHouseApplicationModel,
      currentYear,
      "applicationDate"
    );

    const totalUsers = await getTotalCount(UserModel);

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
        userCountsByMonth,
        totalUsers,
        eventApplicationCountsByMonth,
        f2rApplicationCountsByMonth,
        jobHouseCountsByMonth,
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
