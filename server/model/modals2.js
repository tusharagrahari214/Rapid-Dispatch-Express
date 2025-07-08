const mongoose = require("mongoose");
const autoIncrementModelID = require("./counter");

// Step 5: Define the schema for the truck data.
const truckSchema = new mongoose.Schema({
    truck_name: { type: String, required: true },
    truck_model: { type: String, required: true },
    truck_number: { type: String, required: true }, // Corrected 'string' to 'String'
    truck_year: { type: Number, required: true },
    truck_capacity: { type: Number, required: true },
    driver_name: { type: String, required: true },
    driver_license: { type: String, required: true },
    driver_contact: { type: String, required: true },
    truck_status: { type: String, required: true }
});

// Step 6: Create a Mongoose model based on the schema.
const Truck = mongoose.model('Truck', truckSchema);

// Step 7: Set up middleware for parsing JSON and URL-encoded bodies.
module.exports = Truck;
