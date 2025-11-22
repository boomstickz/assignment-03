// app.js 

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const app = express();

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
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
  })
);

// Make session available in all EJS views
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Set EJS
app.set("view engine", "ejs");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// Session access  
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});


// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/dashboards", require("./routes/dashboards"));

// Server
app.listen(3000, () => console.log("Server running on port 3000"));
