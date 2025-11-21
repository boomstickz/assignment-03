const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { isLoggedIn } = require("../middleware/auth");

// Dashboard List
router.get("/", isLoggedIn, dashboardController.getAllDashboards);

// Create Dashboard
router.get("/create", isLoggedIn, dashboardController.createPage);
router.post("/create", isLoggedIn, dashboardController.createDashboard);

// Edit Dashboard
router.get("/edit/:id", isLoggedIn, dashboardController.editPage);
router.post("/edit/:id", isLoggedIn, dashboardController.updateDashboard);

// Delete Dashboard
router.post("/delete/:id", isLoggedIn, dashboardController.deleteDashboard);

module.exports = router;
