const bcrypt = require("bcryptjs");
const User = require("../models/User");

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const githubCallbackUrl =
  process.env.GITHUB_CALLBACK_URL || "http://localhost:3000/auth/github/callback";

const renderRegister = (res, error = null) => res.render("register", { error });

module.exports.registerPage = (req, res) => {
  const error = req.query.error || null;
  renderRegister(res, error);
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
  let error = req.query.error || null;

  if (error === "github") {
    error = "GitHub authentication failed. Please try again.";
  }

  res.render("login", { error });
};

module.exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.render("login", { error: "Invalid username or password." });
  }

  if (!user.password) {
    return res.render("login", {
      error: "This account uses GitHub login. Please sign in with GitHub.",
    });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.render("login", { error: "Invalid username or password." });
  }

  req.session.userId = user._id;
  res.redirect("/dashboards");
};

module.exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

module.exports.githubLogin = (req, res) => {
  if (!githubClientId || !githubClientSecret) {
    return res.redirect("/auth/login?error=github");
  }

  const params = new URLSearchParams({
    client_id: githubClientId,
    redirect_uri: githubCallbackUrl,
    scope: "read:user user:email",
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
};

module.exports.githubCallback = async (req, res) => {
  const { code } = req.query;

  if (!code || !githubClientId || !githubClientSecret) {
    return res.redirect("/auth/login?error=github");
  }

  try {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id: githubClientId,
        client_secret: githubClientSecret,
        code,
        redirect_uri: githubCallbackUrl,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      throw new Error("No access token returned from GitHub");
    }

    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokenData.access_token}`,
        "User-Agent": "power-codex-app",
      },
    });

    const profile = await userResponse.json();

    if (!profile || !profile.id) {
      throw new Error("Invalid profile returned from GitHub");
    }

    let user = await User.findOne({ githubId: profile.id.toString() });

    if (!user) {
      const fallbackUsername = profile.login || profile.name || `github_user_${profile.id}`;

      user = await User.create({
        username: fallbackUsername,
        password: "",
        githubId: profile.id.toString(),
        avatarUrl: profile.avatar_url || "",
      });
    }

    req.session.userId = user._id;

    res.redirect("/dashboards");
  } catch (error) {
    console.error("GitHub OAuth error", error);
    res.redirect("/auth/login?error=github");
  }
};