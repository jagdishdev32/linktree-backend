const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Enabling Environment Variables from .env file
require("dotenv").config();

const app = express();

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL);

//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Enabling Json Parse Support
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.status(200).json({ message: "welcome to home page!" });
});

// Routes
const usersRoute = require("./routes/users.route");
const linksRoute = require("./routes/links.route");

app.use("/users", usersRoute);
app.use("/links", linksRoute);

module.exports = app;
