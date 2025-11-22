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
  await Dashboard.create({
    title: req.body.title,
    description: req.body.description,
    owner: req.session.userId
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
  await Dashboard.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description
  });
  res.redirect("/dashboards/" + req.params.id);
};

// DELETE ACTION
module.exports.deleteDashboard = async (req, res) => {
  await Dashboard.findByIdAndDelete(req.params.id);
  res.redirect("/dashboards");
};
