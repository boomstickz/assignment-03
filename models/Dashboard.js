const mongoose = require("mongoose");

const DashboardSchema = new mongoose.Schema({
  title: String,
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  // Phase 4 additions:
  images: [String],      // uploaded image filenames
  abilities: [String],   // array of strings
  tags: [String],        // array of category/theme tags
  colors: [String],      // 1–4 hex/RGB values

}, { timestamps: true });

module.exports = mongoose.model("Dashboard", DashboardSchema);
