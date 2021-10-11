require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/authentication-routes");
const passengerRoutes = require("./routes/passenger-routes");
const conductorRoutes = require("./routes/conductor-routes");
const managerRoutes = require("./routes/manager-routes");
const inspectorRoutes = require("./routes/inspector-route");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

const URI = process.env.MONGODB_DEV_URI;

mongoose
  .connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connection Success");
  })
  .catch((err) => {
    console.log("Connection Failed - " + err);
  });

app.use("/matrix/api/auth", authRoutes);
app.use("/matrix/api/passenger", passengerRoutes);
app.use("/matrix/api/conductor", conductorRoutes);
app.use("/matrix/api/manager", managerRoutes);
app.use("/matrix/api/inspector", inspectorRoutes);

module.exports = app;
