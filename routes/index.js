const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // Logged in? Go to dashboards.
  if (req.session && req.session.userId) {
    return res.redirect("/dashboards");
  }

  // Not logged in? Show landing page.
  res.render("home");
});

module.exports = router;
