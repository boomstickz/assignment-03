const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Register + Login Pages
router.get("/login", authController.loginPage);
router.get("/register", authController.registerPage);

// Form Submissions
router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);

router.get("/logout", authController.logoutUser);

module.exports = router;
