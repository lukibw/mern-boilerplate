const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./routes/users");

// Passport strategy

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!bcrypt.compare(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// Connect mongo
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Successfully connected to MongoDB");
  }
);

const app = express();

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use("/users", usersRouter);

// Sessions
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
