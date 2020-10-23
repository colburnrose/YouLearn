var User = require("../models/user.js");

module.exports = function (app, passport) {
  // home page ==============================================
  app.get("/", function (req, res) {
    res.status(200).json({ message: "Welcome to YouLearn." });
  });

  // show the login form ====================================
  app.get("/login", function (req, res) {
    res.status(200).json({ message: "Login Page" });
  });

  // show the signup form ===================================
  app.get("/signup", function (req, res) {
    res.status(200).json({ message: "Signup Page" });
  });
  // profile page show when loggedin ========================
  app.get("/profile", isLoggedIn, function (req, res) {
    res.status(200).json({ message: "Profile Page", user: req.user });
  });

  // Temp Routes: testing ===================================
  app.get("/users", (req, res) => {
    User.find()
      .then((users) => res.send(users))
      .catch((error) => errorHandler(error));
  });

  // middleware to detect login =============================
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next;

    res.redirect("/");
  }

  // route middleware to make sure a user is logged in as an admin
  function isAdmin(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated() && req.user.level == "admin") return next();

    // if they aren't redirect them to the home page
    res.redirect("/");
  }

  function errorHandler(err) {
    console.log(err.message);
  }
};
