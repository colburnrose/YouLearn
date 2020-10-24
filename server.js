var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
require("dotenv/config");

var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");

// week2 - mongodb atlas
mongoose.connect(
  process.env.db_connection,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Database connected successfully!")
);
// week2 - authentication
require("./config/passport")(passport);
app.use(morgan("dev"));
app.use(cookieParser());

app.use(bodyParser());

// week 5 template

// week 2 authentication
app.use(session({ secret: "bloc-youlearn-8-weeks" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes ======================================
require("./app/routes/main.js")(app, passport);
require("./app/routes/auth.js")(app, passport);

// launch server ===========================================
app.listen(port);
console.log(`YouLearn is running at http://localhost:${port}`);
