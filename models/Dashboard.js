const mongoose = require("mongoose");

const DashboardSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  abilities: [String],        // list system
  rgbColors: [String],        // stores gradient strip colors
  images: [String],           // filenames from uploads
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Dashboard", DashboardSchema);
