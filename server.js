const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      //   "https://fan-gram-admin-panel.vercel.app",
      //   "https://fan-gram.vercel.app",
    ],
  })
);

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// // Routes Imports
const userRoute = require("./routes/userRoutes");
const eventRoute = require("./routes/eventRoutes");
const eventApplicationRoute = require("./routes/eventApplicationRoutes");
const jobHouseRoute = require("./routes/jobHouseRoutes");
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");
const FRApplicationRoutes = require("./routes/FRApplicationRoutes");
const InquiryRoutes = require("./routes/inquiryRoutes");

// Routes
app.use("/", userRoute);
app.use("/", eventRoute);
app.use("/", eventApplicationRoute);
app.use("/", jobHouseRoute);
app.use("/", jobApplicationRoutes);
app.use("/", FRApplicationRoutes);
app.use("/", InquiryRoutes);

//database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log("err: ", err.message);
  });

app.listen(5000, () => {
  console.log("server listening on port ", 5000);
});
