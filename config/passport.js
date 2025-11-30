/* const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

const User = require("../models/User");

const buildCallbackUrl = (envKey, defaultPath) =>
  process.env[envKey] || `${process.env.BASE_URL || "http://localhost:3000"}${defaultPath}`;

const upsertOAuthUser = async (profile, provider, idField) => {
  const email = Array.isArray(profile.emails) && profile.emails.length > 0
    ? profile.emails[0].value
    : undefined;

  const query = { [idField]: profile.id };
  let user = await User.findOne(query);

  if (!user && email) {
    user = await User.findOne({ email });
  }

  if (!user) {
    user = await User.create({
      [idField]: profile.id,
      provider,
      displayName: profile.displayName || profile.username,
      email,
      avatar: profile.photos && profile.photos.length ? profile.photos[0].value : undefined,
    });
  } else if (!user[idField]) {
    user[idField] = profile.id;
    user.provider = provider;
    await user.save();
  }

  return user;
};

module.exports = function configurePassport() {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: buildCallbackUrl("GOOGLE_CALLBACK_URL", "/auth/google/callback"),
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const user = await upsertOAuthUser(profile, "google", "googleId");
            done(null, user);
          } catch (err) {
            done(err, null);
          }
        }
      )
    );
  }

  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    passport.use(
      new GitHubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          callbackURL: buildCallbackUrl("GITHUB_CALLBACK_URL", "/auth/github/callback"),
          scope: ["user:email"],
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const user = await upsertOAuthUser(profile, "github", "githubId");
            done(null, user);
          } catch (err) {
            done(err, null);
          }
        }
      )
    );
  }
}; */