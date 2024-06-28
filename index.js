const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://home-bridge-website.vercel.app",
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", async (req, res) => {
  res.json({ message: "server running!!!" });
});

// Routes Imports
const counterRoutes = require("./routes/countersRoute");
const userRoute = require("./routes/userRoutes");
const eventRoute = require("./routes/eventRoutes");
const eventApplicationRoute = require("./routes/eventApplicationRoutes");
const jobHouseRoute = require("./routes/jobHouseRoutes");
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");
const FRApplicationRoutes = require("./routes/FRApplicationRoutes");
const InquiryRoutes = require("./routes/inquiryRoutes");
const RefundRoutes = require("./routes/refundRoutes");

// Routes
app.use("/", counterRoutes);
app.use("/", userRoute);
app.use("/", eventRoute);
app.use("/", eventApplicationRoute);
app.use("/", jobHouseRoute);
app.use("/", jobApplicationRoutes);
app.use("/", FRApplicationRoutes);
app.use("/", InquiryRoutes);
app.use("/", RefundRoutes);

//database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log("err: ", err.message);
  });

app.listen(PORT, () => {
  console.log("server listening on port ", PORT);
});
