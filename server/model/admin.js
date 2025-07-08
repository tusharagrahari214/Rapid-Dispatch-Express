const mongoose = require("mongoose");

// Define the admin schema
const adminSchema = new mongoose.Schema({
    RIG: {
        type: String,
        required: [true, "Admin ID is required"], // Validation for Admin ID
    },
    password: {
        type: String,
        required: [true, "Password is required"], // Validation for Password
    },
});

// Create a model from the schema
const adminDB = mongoose.model('adminDB', adminSchema);

// Export the model for use in other files
module.exports = adminDB;
