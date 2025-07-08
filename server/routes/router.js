const express = require("express");
const router = express.Router();

const services = require("../services/render");
const controller = require('../controller/controller');

// HTML Rendering Routes
router.get('/', services.homeRoutes);                  // Home page
router.get('/view', services.viewTruck);                // View all trucks
router.get('/update-truck', services.update_truck);     // Update truck details
router.get('/showtruck', services.showTruck);           // Show all trucks
router.get('/updateTruck', services.updateTruck);       // Update specific truck
router.get('/viewPending', services.viewTruckPending);   // View pending trucks
router.get('/viewArrived', services.viewTruckArrived);   // View arrived trucks
router.get('/add1', services.addTruck);                 // Add new truck page
router.get('/add2', services.addcase);                  // Add new case page
router.get('/seetruckdetail', services.SeeTruckDetails); // View details of a specific truck
router.get('/makepayment', services.MakePayment);       // Make payment for a truck
router.get('/createnewuser', services.createnewuser);   // Create new employee page
router.get('/contact', services.contactUs);             // Contact us page
router.get("/login", services.login);                   // Login page
router.get("/managerview", services.mymanagerView);     // View managers
router.get("/managerlogin", services.mymanagerlogin);   // Manager login page
router.get("/register", services.register);             // Register page
router.get('/manager', services.viewManager);           // View all managers
router.get('/success', services.success);               // Success page
router.get('/failure', services.failure);               // Failure page
router.get('/about', services.aboutUs);                 // About us page

// API Routes
router.post('/api/users', controller.create);           // Create a new user (consignment)
router.get('/api/users', controller.find);              // Retrieve all users (cons)
router.put('/api/users/:id', controller.update);        // Update an existing user (con)
router.delete('/api/users/:id', controller.delete);     // Delete a user (con)

router.post('/api/users2', controller.create2);         // Create a new truck
router.get('/api/users2', controller.find2);            // Retrieve all trucks
router.put('/api/users3', controller.update2);          // Update truck details

router.post('/api/manager', controller.createManager);   // Create a new employee
router.get('/api/manager', controller.findManager);      // Retrieve all employee

module.exports = router; // Export the router for use in the main app
