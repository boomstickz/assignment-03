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

  const update = {
    title,
    description,
    tags: tags ? tags.split(",").map(x => x.trim()) : [],
    abilities: abilities ? abilities.split(",").map(x => x.trim()) : [],
    colors: colors ? colors.split(",").map(x => x.trim()) : []
  };

  // If new images were uploaded
  if (req.files.length > 0) {
    update.$push = { images: { $each: req.files.map(f => f.filename) } };
  }

  await Dashboard.findByIdAndUpdate(req.params.id, update);
  res.redirect("/dashboards/" + req.params.id);
};


// DELETE ACTION
module.exports.deleteDashboard = async (req, res) => {
  await Dashboard.findByIdAndDelete(req.params.id);
  res.redirect("/dashboards");
};
