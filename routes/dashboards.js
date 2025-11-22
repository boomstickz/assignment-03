const { requireAuth } = require("../middleware/auth");
const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// Dashboard List
router.get("/", dashboardController.listDashboards);

// Create Dashboard
router.get("/create", requireAuth, dashboardController.createDashboardPage);
router.post(
  "/create", requireAuth,
  upload.array("images", 10),
  dashboardController.createDashboard
);


// Edit Dashboard
router.get("/edit/:id", requireAuth, dashboardController.editDashboardPage);
router.post(
  "/edit/:id", requireAuth,
  upload.array("images", 10),
  dashboardController.updateDashboard
);


// Delete Dashboard
router.post("/delete/:id", requireAuth, dashboardController.deleteDashboard);

// SHOW DASHBOARD
router.get("/:id", requireAuth, dashboardController.showDashboard);

module.exports = router;
