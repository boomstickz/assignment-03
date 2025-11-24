// app.js
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/power-codex";

app.set("view engine", "ejs");

// Body + Static
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("public/uploads"));

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || "testsecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongoUri,
      collectionName: "sessions",
    }),
   cookie: { maxAge: 1000 * 60 * 60 * 24 },

  })
);

// Make session available in all EJS views
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});


// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/dashboards", require("./routes/dashboards"));

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));