const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();
const isAuth = require("../middleware/isAuth");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.json({ message: "Fill in all fields" });
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.json({
      message: "User with this email already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return res.json({
    user: { id: newUser.id, email: newUser.email, username: newUser.username },
    message: "Successfully registered. You can login now",
  });
});

router.post("/login", (req, res) => {
  passport.authenticate("local", (err, user) => {
    if (!req.body.email || !req.body.password) {
      return res.json({ message: "Fill in all fields" });
    }
    if (err) {
      return res.json({ message: err });
    }
    if (!user) {
      return res.json({ message: "User not found" });
    }
    req.logIn(user, err => {
      if (err) {
        return res.json({ message: err });
      }
      return res.json({
        message: "Successfully logged in",
        user: { id: user.id, email: user.email, username: user.username },
      });
    });
  })(req, res);
});

router.get("/logout", isAuth, (req, res) => {
  req.logout();
  res.json({ message: "Successfully logged out" });
});

router.get("/user", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json({ message: "User found", user });
  } catch (err) {
    return res.json({ message: "User not found" });
  }
});

module.exports = router;
