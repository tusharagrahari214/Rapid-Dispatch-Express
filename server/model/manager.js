const mongoose = require("mongoose");

// Define the schema for manager (employee) details
var schema = new mongoose.Schema({
    mno: { // Employee number
        type: String // Data type is String
    },
    mname: { // Employee name
        type: String // Data type is String
    },
    leaveFrom: { // Start date of leave
        type: String // Data type is String
    },
    leaveTill: { // End date of leave
        type: String // Data type is String
    },
    nature: { // Nature of leave
        type: String // Data type is String
    }
});

// Create a Mongoose model using the defined schema
const Managerdb = mongoose.model('managerdb', schema);

// Export the model for use in other parts of the application
module.exports = Managerdb;
