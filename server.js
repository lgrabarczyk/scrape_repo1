// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Requiring our Note and Article models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
// Scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

var PORT = process.env.PORT || 8080;

// Initialized Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Serving static stuff
app.use(express.static("public"));

// Set up Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes 
var routes = require("./controllers/scraper_controller.js");

app.use("/", routes);

mongoose.connect("/Users/owner/Desktop/scrape_repo1/data");

var db = mongoose.connection;

// Show mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message hopefully
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Listening on port 3000
app.listen(PORT, function() {
  console.log("App running on PORT " + PORT);
});
