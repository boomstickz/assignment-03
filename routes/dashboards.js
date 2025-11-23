const { requireAuth } = require("../middleware/auth");
const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// DASHBOARD LIST (public or protected depending on your design)
router.get("/", dashboardController.listDashboards);

// CREATE DASHBOARD
router.get("/create", requireAuth, dashboardController.createDashboardPage);
router.post(
  "/create",
  requireAuth,
  upload.array("images", 10),
  dashboardController.createDashboard
);

// DELETE CONFIRMATION PAGE
router.get("/delete/:id", requireAuth, dashboardController.deleteDashboardPage);

// DELETE ACTION (POST)
router.post("/delete/:id", requireAuth, dashboardController.deleteDashboard);

// EDIT DASHBOARD
router.get("/edit/:id", requireAuth, dashboardController.editDashboardPage);
router.post(
  "/edit/:id",
  requireAuth,
  upload.array("images", 10),
  dashboardController.updateDashboard
);

router.post("/:id/remove-image", requireAuth, dashboardController.removeImage);


// SHOW DASHBOARD (MUST ALWAYS BE LAST)
router.get("/:id", requireAuth, dashboardController.showDashboard);

module.exports = router;
