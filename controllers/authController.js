const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports.registerPage = (req, res) => {
  res.render("register");
};

module.exports.registerUser = async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Passwords must match
  if (password !== confirmPassword) {
    return res.render("register", { error: "Passwords do not match." });
  }

  // enforce minimum length
  if (password.length < 6) {
    return res.render("register", { error: "Password must be at least 6 characters." });
  }

  // Check if username exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.render("register", { error: "Username is already taken." });
  }

  // Create the user
  const bcrypt = require("bcryptjs");
  const hashed = await bcrypt.hash(password, 10);

  await User.create({ username, password: hashed });

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
