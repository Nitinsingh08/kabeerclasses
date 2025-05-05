//requiring modules
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const https = require("https");
const dotenv = require("dotenv");
const _ = require("lodash");
const jsonData = require("./public/data/data.json");

// INITIALIZING EXPRESS APP
const app = express();

//requiring dotenv
require("dotenv").config();

// Setting up port and local files for use
const port = process.env.PORT || 5000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Trying to read the json data
const el = jsonData["Class-11th"];
const tw = jsonData["Class-12th"];
const je = jsonData["JEE-Dropper"];
const ne = jsonData["NEET-Dropper"];

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/learningpath/:path", function (req, res) {
  link = _.lowerCase(req.params.path);
  res.render("learningpath", {
    categoryName: link,
    eleven: el,
    twelve: tw,
    jee: je,
    neet: ne,
  });
});

app.get("/download-file", function (req, res) {
  res.download("./public/docs/chapter-one.pdf");
});

app.get("/formSubmit", function (req, res) {
  res.render("formSubmit");
});

app.get("/submit", function (req, res) {
  res.render("success");
});
app.post("/submit", function (req, res) {
  res.render("success", {
    FirstName: req.body["first-Name"],
    LastName: req.body["last-Name"],
  });
});

// Making the learning path working and interactive with the vertical scrollable side bar menu
// LISTENING ON PORT 5000 AND RUNNING THE LOCAL SERVER FOR DEVELOPMENT
app.listen(port, function (req, res) {
  console.log("The Server is up and running on port 5000 !!");
});

// Change the name of the routes to make the url look more professional
