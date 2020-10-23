// config/passport.jsauth
var passport = require("passport");
// load all the things we need
var LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;

// load up the user model
var User = require("../app/models/user.js");

// expose this function to our app use module.exports
module.exports = function (passport) {
  // ==============================================
  // passport session setup =======================
  // ==============================================
  // require for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    console.log("SERIALIZE: ", user);
    done(null, user.id);
  });

  // use to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // ===========================================================
  // LOCAL SIGNUP ==============================================
  // ===========================================================
  // we are using named strategies since we have one for login and
  // one for signup by default, if there was no name, it would just
  // be called 'local'
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      function (req, email, password, done) {
        // asynchronous
        // User.findOne won't fire unless data is sent back
        process.nextTick(function () {
          // find a user whose email is the same as the forms email
          // we are checking to see if the user trying to login already exists
          User.findOne({ "local.email": email }, function (err, user) {
            // if there are any errors, return the error
            if (err) return done(err);

            // check to see if user exist
            if (user) {
              return done(
                null,
                false,
                req.flash("signupMessage", "That email is already taken.")
              );
            } else {
              // if no user exist with that email
              // create the user
              var newUser = new User();

              // set the user's local credentials
              newUser.local.email = email;
              newUser.local.password = newUser.generateHash(password);
              // newUser.username = req.body.username; // if we decided to allow usernames down the road, maybe

              // save the user
              newUser.save(function (err) {
                if (err) throw err;
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );
};
