// Import required models
const Userdb = require('../model/model'); // Model for consignment details
const Truck = require('../model/modals2'); // Model for truck details
const Managerdb = require('../model/manager'); // Model for manager details

// Create and save a new truck
exports.create2 = async (req, res) => {
    try {
        // Destructure truck details from request body
        const { truck_name, truck_model, truck_number, truck_year, truck_capacity, driver_name, driver_license, driver_contact, truck_status } = req.body;

        // Create a new truck instance
        const newTruck = new Truck({
            truck_name,
            truck_model,
            truck_number,
            truck_year,
            truck_capacity,
            driver_name,
            driver_license,
            driver_contact,
            truck_status
        });

        // Save the new truck to the database
        await newTruck.save();
        res.status(201).redirect('/add1'); // Redirect after successful creation
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding truck to the database.'); // Error handling
    }
};

// Find truck by truck number or retrieve all trucks
exports.find2 = (req, res) => {
    if (req.query.id) {  // If an ID is provided in the query
        const id = req.query.id;
        Truck.findById(id)  // Find truck by ID
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Truck not found with id " + id }); // Not found response
                } else {
                    res.send(data); // Send found truck data
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).send({ message: "Error retrieving truck with id " + id }); // Error handling
            });
    } else {
        Truck.find()  // If no ID, retrieve all trucks
            .then(trucks => {
                res.send(trucks); // Send all truck data
            })
            .catch(err => {
                console.error(err);
                res.status(500).send({ message: "Error retrieving trucks from the database" }); // Error handling
            });
    }
};

// Update an existing truck by truck number
exports.update2 = async (req, res) => {
    try {
        // Destructure truck details from request body
        const { truck_name, truck_model, truck_number, truck_year, truck_capacity, driver_name, driver_license, driver_contact, truck_status } = req.body;

        // Find the truck by truck_number and update its details
        const updatedTruck = await Truck.findOneAndUpdate(
            { truck_number: truck_number },  // Find truck by truck_number
            {
                truck_name,
                truck_model,
                truck_year,
                truck_capacity,
                driver_name,
                driver_license,
                driver_contact,
                truck_status
            },
            { new: true }  // Return the updated document
        );

        if (!updatedTruck) {
            return res.status(404).send('Truck not found.'); // Not found response
        }

        res.status(200).redirect('/updateTruck');  // Redirect after successful update
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating truck in the database.'); // Error handling
    }
};

// Create a new consignment
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" }); // Bad request response
        return;
    }

    // Create a new instance of consignment
    const consignment = new Userdb({ // Updated variable name to reflect 'consignment'
        truckNumber: req.body.truckNumber,
        pickdate: req.body.pickdate,
        deldate: req.body.deldate,
        Truck: req.body.Truck,
        Sender: req.body.Sender,
        Receiver: req.body.Receiver,
        Status: req.body.Status,
        ConsignmentNumber: req.body.ConsignmentNumber,
        Addressreceiver: req.body.Addressreceiver,
        Addresssender: req.body.Addresssender,
        Volume: req.body.Volume,
        Summary: req.body.Summary,
    });

    // Save consignment in the database
    consignment
        .save(consignment)
        .then(data => {
            res.redirect('/add2'); // Redirect after successful creation
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a consignment" // Error handling
            });
        });
}

// Search for consignments
// Retrieve and return all consignments or a single consignment by ID
exports.find = (req, res) => {
    if (req.query.id) { // If an ID is provided in the query
        const id = req.query.id;

        Userdb.findById(id) // Find consignment by ID
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found consignment with id " + id }); // Not found response
                } else {
                    res.send(data); // Send found consignment data
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving consignment with id " + id }); // Error handling
            });
    } else {
        Userdb.find() // If no ID, retrieve all consignments
            .then(consignments => {
                res.send(consignments); // Send all consignment data
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occurred while retrieving consignment information" }); // Error handling
            });
    }
}

// Update an existing consignment using ID
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update cannot be empty" }); // Bad request response
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false }) // Update consignment by ID
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update consignment with ${id}. Maybe consignment not found!` }); // Not found response
            } else {
                res.send(data); // Send updated consignment data
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating consignment information" }); // Error handling
        });
}

// Delete a consignment with specified ID in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id) // Delete consignment by ID
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete with id ${id}. Maybe id is wrong` }); // Not found response
            } else {
                res.send({
                    message: "Consignment was deleted successfully!" // Success message
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete consignment with id=" + id // Error handling
            });
        });
}

// Create a new employee
exports.createManager = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" }); // Bad request response
        return;
    }

    // Create a new instance of manager
    const manager = new Managerdb({
        mno: req.body.mno,
        mname: req.body.mname,
        leaveFrom: req.body.leaveFrom,
        leaveTill: req.body.leaveTill,
        nature: req.body.nature
    });

    // Save manager in the database
    manager.save()
        .then(data => {
            res.send(data); // Send created manager data
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating a manager" // Error handling
            });
        });
}

// Find manager by ID or retrieve all employee
exports.findManager = (req, res) => {
    if (req.query.id) { // If an ID is provided in the query
        const id = req.query.id;
        Managerdb.findById(id) // Find manager by ID
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Manager not found with id " + id }); // Not found response
                } else {
                    res.send(data); // Send found manager data
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).send({ message: "Error retrieving manager with id " + id }); // Error handling
            });
    } else {
        Managerdb.find() // If no ID, retrieve all managers
            .then(managers => {
                res.send(managers); // Send all manager data
            })
            .catch(err => {
                console.error(err);
                res.status(500).send({ message: "Error retrieving managers from the database" }); // Error handling
            });
    }
}
