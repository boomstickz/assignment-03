const Dashboard = require("../models/Dashboard");

module.exports = {
  getAllDashboards: async (req, res) => {
    const dashboards = await Dashboard.find({ owner: req.session.userId });
    res.render("dashboardList", { dashboards });
  },

  createPage: (req, res) => res.render("dashboardCreate"),

  createDashboard: async (req, res) => {
    await Dashboard.create({
      title: req.body.title,
      description: req.body.description,
      owner: req.session.userId
    });
    res.redirect("/dashboards");
  },

  editPage: async (req, res) => {
    const dash = await Dashboard.findById(req.params.id);
    res.render("dashboardEdit", { dash });
  },

  updateDashboard: async (req, res) => {
    await Dashboard.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description
    });
    res.redirect("/dashboards");
  },

  deleteDashboard: async (req, res) => {
    await Dashboard.findByIdAndDelete(req.params.id);
    res.redirect("/dashboards");
  }
};
