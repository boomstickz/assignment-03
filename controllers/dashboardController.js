const Dashboard = require("../models/Dashboard");

// LIST ALL DASHBOARDS
module.exports.listDashboards = async (req, res) => {
  const dashboards = await Dashboard.find({ owner: req.session.userId }).lean();
  res.render("dashboardList", { dashboards });
};

// CREATE PAGE
module.exports.createDashboardPage = (req, res) => {
  res.render("dashboardCreate");
};

// CREATE ACTION
module.exports.createDashboard = async (req, res) => {
  const { title, description, tags, abilities, colors } = req.body;

  await Dashboard.create({
    title,
    description,
    owner: req.session.userId,
    images: req.files.map(f => f.filename),
    tags: tags ? tags.split(",").map(x => x.trim()) : [],
    abilities: abilities ? abilities.split(",").map(x => x.trim()) : [],
    colors: colors ? colors.split(",").map(x => x.trim()) : []
  });

  res.redirect("/dashboards");
};

// SHOW DASHBOARD
module.exports.showDashboard = async (req, res) => {
  const dash = await Dashboard.findById(req.params.id).lean();
  if (!dash) return res.redirect("/dashboards");
  res.render("dashboardShow", { dash });
};

// EDIT PAGE
module.exports.editDashboardPage = async (req, res) => {
  const dash = await Dashboard.findById(req.params.id).lean();
  res.render("dashboardEdit", { dash });
};

// UPDATE ACTION
module.exports.updateDashboard = async (req, res) => {
  const { title, description, tags, abilities, colors } = req.body;

  const dash = await Dashboard.findById(req.params.id);

  if (!dash) return res.redirect("/dashboards");

  // Update simple fields
  dash.title = title;
  dash.description = description;
  dash.tags = tags ? tags.split(",").map(x => x.trim()) : [];
  dash.abilities = abilities ? abilities.split(",").map(x => x.trim()) : [];
  dash.colors = colors ? colors.split(",").map(x => x.trim()) : [];

  // Handle new images
  if (req.files && req.files.length > 0) {
    const newImages = req.files.map(f => f.filename);
    dash.images.push(...newImages);
  }

  await dash.save();

  res.redirect("/dashboards/" + req.params.id);
};



// DELETE ACTION

module.exports.deleteDashboardPage = async (req, res) => {
  const dash = await Dashboard.findById(req.params.id).lean();
  if (!dash) return res.redirect("/dashboards");
  res.render("dashboardDelete", { dash });
};


module.exports.deleteDashboard = async (req, res) => {
  await Dashboard.findByIdAndDelete(req.params.id);
  res.redirect("/dashboards");
};

module.exports.removeImage = async (req, res) => {
  const { id } = req.params;
  const { imageName } = req.body;

  const dash = await Dashboard.findById(id);
  if (!dash) return res.redirect("/dashboards");

  // Remove from array
  dash.images = dash.images.filter(img => img !== imageName);

  await dash.save();

  // OPTIONAL: delete actual file from /public/uploads
  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(__dirname, "..", "public", "uploads", imageName);
  
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  res.redirect("/dashboards/edit/" + id);
};
