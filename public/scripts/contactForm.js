const express = require('express'); // Import Express
const nodemailer = require('nodemailer'); // Import Nodemailer
const bodyParser = require('body-parser'); // Import Body-Parser

const app = express(); // Create Express app
const port = 3000; // Define port

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Endpoint to send emails
app.post('/send-email', (req, res) => {
    // Get fields from request body
    const { name, email, contactnumber, total_weight, pickup_address, delivery_address, message } = req.body;

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Gmail service
        auth: {
            user: 'your-email@gmail.com', // Your email
            pass: 'your-password' // Your password
        }
    });

    // Email options
    const mailOptions = {
        from: 'your-email@gmail.com', // Sender
        to: 'recipient-email@example.com', // Recipient
        subject: 'New Contact Form Submission', // Subject
        text: `Name: ${name}\nEmail: ${email}\nContact Number: ${contactnumber}\nTotal Consignment Weight: ${total_weight}\nPickup Address: ${pickup_address}\nDelivery Address: ${delivery_address}\nMessage: ${message}` // Email body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error); // Log error
            res.status(500).send('Error sending email'); // Send error response
        } else {
            console.log('Email sent: ' + info.response); // Log success
            res.status(200).send('Email sent successfully'); // Send success response
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`); // Log server start
});
