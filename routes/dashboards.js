const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// Dashboard List
router.get("/", dashboardController.getAllDashboards);

// Create Dashboard
router.get("/create", dashboardController.createPage);
router.post("/create", dashboardController.createDashboard);

// Edit Dashboard
router.get("/edit/:id", dashboardController.editPage);
router.post("/edit/:id", dashboardController.updateDashboard);

// Delete Dashboard
router.post("/delete/:id", dashboardController.deleteDashboard);

module.exports = router;
