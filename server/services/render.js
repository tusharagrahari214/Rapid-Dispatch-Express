const axios = require("axios");

// Render the home page
exports.homeRoutes = (req, res) => {
    axios.get("http://localhost:5000/api/users");
    res.render('pages/index');
}

// View all consignment
exports.viewTruck = (req, res) => {
    axios.get('http://localhost:5000/api/users')
        .then(function (response) {
            res.render('pages/viewTruck', { users: response.data });
        })
        .catch(err => {
            res.send(err);
        });
}

// View cnsignment that are pending
exports.viewTruckPending = (req, res) => {
    axios.get('http://localhost:5000/api/users')
        .then(function (response) {
            res.render('pages/viewTruckPending', { users: response.data });
        })
        .catch(err => {
            res.send(err);
        });
}

// View consignment that have arrived
exports.viewTruckArrived = (req, res) => {
    axios.get('http://localhost:5000/api/users')
        .then(function (response) {
            res.render('pages/viewTruckArrived', { users: response.data });
        })
        .catch(err => {
            res.send(err);
        });
}

// View admin
exports.mymanagerView = (req, res) => {
    axios.get('http://localhost:5000/api/users')
        .then(function (response) {
            res.render('pages/managerview', { users: response.data });
        })
        .catch(err => {
            res.send(err);
        });
}

// Render the add truck page
exports.addTruck = (req, res) => {
    console.log(req.body);
    res.render('pages/addTruck');
}

// Render the add consi page
exports.addcase = (req, res) => {
    res.render('pages/addcase');
}

// Show all trucks
exports.showTruck = (req, res) => {
    axios.get('http://localhost:5000/api/users2')
        .then(function (response) {
            res.render('pages/showTruck', { users2: response.data });
        })
        .catch(err => {
            res.send(err);
        });
}

// Update truck details
exports.updateTruck = (req, res) => {
    axios.get('http://localhost:5000/api/users2', { params: { id: req.query.id } })
        .then(function (truckdata) {
            res.render("pages/updateTruck", { user: truckdata.data });
        })
        .catch(err => {
            res.send(err);
        });
}

// Update cosig with specified id
exports.update_truck = (req, res) => {
    axios.get('http://localhost:5000/api/users', { params: { id: req.query.id } })
        .then(function (truckdata) {
            res.render("pages/update_truck", { user: truckdata.data });
        })
        .catch(err => {
            res.send(err);
        });
}

// View details of a specific consi
exports.SeeTruckDetails = (req, res) => {
    axios.get('http://localhost:5000/api/users', { params: { id: req.query.id } })
        .then(function (truckdata) {
            res.render("pages/seetruckdetail", { user: truckdata.data });
        })
        .catch(err => {
            res.send(err);
        });
}

// Make a payment for a truck
exports.MakePayment = (req, res) => {
    axios.get('http://localhost:5000/api/users', { params: { id: req.query.id } })
        .then(function (userdata) {
            res.render("pages/makepayment", { user: userdata.data });
        })
        .catch(err => {
            res.send(err);
        });
}

// Render contact us page
exports.contactUs = (req, res) => {
    res.render('pages/contactUs');
}

// Render admin login page
exports.login = (req, res) => {
    res.render('pages/login');
}

// Render emp login page
exports.mymanagerlogin = (req, res) => {
    res.render('pages/managerlogin');
}

// Render new admin create page
exports.register = (req, res) => {
    res.render('pages/register');
}

// Render create new employee page
exports.createnewuser = (req, res) => {
    res.render('pages/createnewuser');
}

// View all emp
exports.viewManager = (req, res) => {
    axios.get('http://localhost:5000/api/manager')
        .then(function (response) {
            res.render('pages/viewManager', { manager: response.data });
        })
        .catch(err => {
            res.send(err);
        });
}

// Render success page
exports.success = (req, res) => {
    res.render('pages/success');
}

// Render failure page
exports.failure = (req, res) => {
    res.render('pages/failure');
}

// Render about us page
exports.aboutUs = (req, res) => {
    res.render('pages/aboutUs');
}
