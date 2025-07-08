var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Define a schema for counters to track sequence numbers
const counterSchema = new Schema({
  _id: { type: String, required: true }, // Counter name (model name)
  seq: { type: Number, default: 0 }, // Current sequence number
});

// Create a unique index on the counter schema to ensure uniqueness
counterSchema.index({ _id: 1, seq: 1 }, { unique: true });

// Create a model for the counter schema
const counterModel = mongoose.model("counter", counterSchema);

// Function to auto-increment a model's ID
const autoIncrementModelID = function (modelName, doc, next) {
  counterModel.findByIdAndUpdate(
    modelName, // Find the counter for the specified model
    { $inc: { seq: 1 } }, // Increment the sequence number
    { new: true, upsert: true }, // Options: return the new document and create if it doesn't exist
    function (error, counter) {
      if (error) return next(error); // Handle any errors

      doc.id = counter.seq; // Assign the incremented sequence number to the document
      next(); // Proceed to the next middleware
    }
  );
};

// Export the auto-increment function
module.exports = autoIncrementModelID;
