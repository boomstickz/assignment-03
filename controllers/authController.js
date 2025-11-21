const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports.registerPage = (req, res) => {
  res.render("register");
};

module.exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 12);

  await User.create({
    username,
    password: hashed
  });

  res.redirect("/auth/login");
};

module.exports.loginPage = (req, res) => {
  res.render("login");
};

module.exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.redirect("/auth/login");

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
