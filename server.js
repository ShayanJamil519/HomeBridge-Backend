const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "https://fan-gram-admin-panel.vercel.app",
//       "https://fan-gram.vercel.app",
//     ],
//   })
// );

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// // Routes Imports
const userRoute = require("./routes/userRoutes");
const eventApplicationRoute = require("./routes/eventApplicationRoutes");
// const businessPromotionRoute = require("./routes/businessPromotionRoutes");
// const videoRoute = require("./routes/videoRoutes");
// const orderRoute = require("./routes/orderRoutes");
// const couponRoute = require("./routes/couponRoutes");
// const celebrityRoute = require("./routes/celebrityRoutes");
// const faqRoute = require("./routes/faqsRoutes");

// // Routes
app.use("/", userRoute);
app.use("/", eventApplicationRoute);
// app.use("/", videoRoute);
// app.use("/", orderRoute);
// app.use("/", couponRoute);
// app.use("/", celebrityRoute);
// app.use("/", businessPromotionRoute);
// app.use("/", faqRoute);

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
