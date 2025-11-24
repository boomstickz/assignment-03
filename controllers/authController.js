const bcrypt = require("bcryptjs");
const User = require("../models/User");

const renderRegister = (res, error = null) => res.render("register", { error });

module.exports.registerPage = (req, res) => {
  renderRegister(res);
};

module.exports.registerUser = async (req, res) => {
  const { username, password, confirmPassword } = req.body;


  if (password !== confirmPassword) {
    return renderRegister(res, "Passwords do not match.");
  }

  if (password.length < 6) {
    return renderRegister(res, "Password must be at least 6 characters.");
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return renderRegister(res, "Username is already taken.");
  }


  const hashed = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashed });

  res.redirect("/auth/login");
};

module.exports.loginPage = (req, res) => {
  res.render("login", { error: null });
};

module.exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.render("login", { error: "Invalid username or password." });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.redirect("/auth/login");

  req.session.userId = user._id;
  res.redirect("/dashboards");
};

module.exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
