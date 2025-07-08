const mongoose = require("mongoose"); // Import the mongoose library for MongoDB object modeling

// Define a schema for the employee (user) model
var userSchema = new mongoose.Schema({
    RIG: {
        type: String, // Define the RIG field as a string
        required: [true, "User ID is required"] // User ID is required
    },
    password: {
        type: String, // Define the password field as a string
        required: [true, "Password is required"] // Password is required
    }
});

// Create a model named 'customerDB' based on the userSchema
const CustomerDB = mongoose.model('customerDB', userSchema);

// Export the CustomerDB model for use in other parts of the application
module.exports = CustomerDB;
