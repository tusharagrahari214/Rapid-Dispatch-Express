const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const md5 = require("md5");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/transport', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database")) // Success message
  .catch(err => console.log(err)); // Error logging

app.set("view engine", "ejs"); // Set view engine
app.set("views", "public"); // Views directory
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies
app.use(express.static("public")); // Serve static files

// Route handlers
app.use("/", require("./server/routes/router")); // Load routes

// MongoDB models
const adminDB = require("./server/model/admin"); // Admin model
const customerDB = require("./server/model/customer"); // Customer model

// Admin registration
app.get("/register", (req, res) => res.render("register")); // Render registration page

// Admin login
app.get("/login", (req, res) => res.render("login")); // Render login page

// Process admin login
app.post("/login", (req, res) => {
  const username = req.body.RIG; // Get username
  const password = md5(req.body.password); // Hash password
  adminDB.findOne({ RIG: username }, (err, foundUser) => {
    if (err) res.redirect("/failure"); // Error handling
    else if (foundUser && foundUser.password === password) res.redirect("/managerview"); // Match
    else res.redirect("/failure"); // No match
  });
});

// Employee registration
app.get("/createnewuser", (req, res) => res.render("createnewuser")); // Render user creation page

// Process employee registration
app.post("/createnewuser", (req, res) => {
  const newEmp = new customerDB({ // Create new employee
    RIG: req.body.RIG,
    password: md5(req.body.password), // Hash password
  });
  newEmp.save(err => err ? res.redirect("/failure") : res.redirect("/login")); // Save and redirect
});

// Employee login
app.get("/managerlogin", (req, res) => res.render("managerlogin")); // Render manager login page

// Process employee login
app.post("/managerlogin", (req, res) => {
  const username = req.body.RIG; // Get username
  const password = md5(req.body.password); // Hash password
  customerDB.findOne({ RIG: username }, (err, foundUser) => {
    if (err) res.redirect("/failure"); // Error handling
    else if (foundUser && foundUser.password === password) res.redirect("/view"); // Match
    else res.redirect("/failure"); // No match
  });
});


// Payment processing route
app.post("/makepayment", (req, res) => res.redirect("/makepayment")); // Redirect to payment

// Start server
app.listen(5000, () => console.log("server running on port 5000")); // Log server status
