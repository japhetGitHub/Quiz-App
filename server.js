// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

app.use(cookieSession({
  name: 'session',
  keys: ['some secret key to encrypt the session value', 'another one to allow for key rotation'],
}));

//Load the user authentication before all routes
const protectRoutes = require('./routes/authenticate');
app.use(protectRoutes(db));

// Separated Routes for each Resource
const homepage = require("./routes/homepage");
const createQuizRoutes = require("./routes/create_quiz");
const loginRoutes = require("./routes/login");
const questionRouter = require('./routes/quiz-router');
const resultRouter = require('./routes/results-router');

// Mount all resource routes
app.use("/api/homepage", homepage(db));
app.use("/quiz/new", createQuizRoutes(db));
app.use("/login", loginRoutes(db));
app.use('/quiz', questionRouter(db));
app.use('/results', resultRouter(db));


app.get("/", (req, res) => {
  res.render("index", { loggedIn: true });
});

app.get("/logout", (req, res) => {
  req.session = null; // destroys the session cookie
  res.redirect('/login');
});

app.listen(PORT, () => {
  console.log(`Quiz app listening on port ${PORT}`);
});
