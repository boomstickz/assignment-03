module.exports = {
  loginPage: (req, res) => res.render("login"),
  registerPage: (req, res) => res.render("register"),

  loginUser: (req, res) => {
    // TODO: authentication logic
    res.redirect("/dashboards");
  },

  registerUser: (req, res) => {
    // TODO: hashing + create user
    res.redirect("/auth/login");
  },

  logoutUser: (req, res) => {
    req.session.destroy(() => res.redirect("/"));
  }
};
