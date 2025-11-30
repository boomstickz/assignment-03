module.exports.requireAuth = (req, res, next) => {
  const activeUserId = req.session.userId || (req.user && req.user._id);

  if (!activeUserId) {
    return res.redirect("/auth/login");
  }


  // Normalize session for both local + OAuth users
  if (!req.session.userId) {
    req.session.userId = activeUserId;
  }


  next();
};
