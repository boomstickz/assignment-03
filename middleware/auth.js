module.exports.isLoggedIn = function (req, res, next) {
  if (!req.session.userId) {
    return res.redirect("/auth/login");
  }
  next();
};

module.exports.isGuest = function (req, res, next) {
  if (req.session.userId) {
    return res.redirect("/dashboards");
  }
  next();
};
