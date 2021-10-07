const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DEFAULT_THEME = process.env.DEFAULT_THEME || "default";
const DEFUALT_TOGGLE = process.env.DEFUALT_TOGGLE == "true" ? true : false;
const FRONTEND_URL = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL
  : "http://localhost:3000/";

const linkSchema = new Schema({
  title: { type: String, min: 0, max: 200 },
  url: { type: String, min: 0, max: 500 },
  toggle: { type: Boolean, default: DEFUALT_TOGGLE },
  clicks: { type: Number, default: 0 },
});

const userSchema = new Schema({
  username: { type: String, min: 3, max: 100, required: true, unique: true },
  password: { type: String, min: 3, max: 200, required: true },
  myLinkTree: { type: String, min: 3, max: 300, required: true, unique: true },
  clicks: { type: Number, default: 0 },
  // theme Could be number or name
  theme: { type: String, default: DEFAULT_THEME },
  links: [linkSchema],
  creationDate: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
