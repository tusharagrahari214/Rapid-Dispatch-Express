const express = require('express');
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.connect("mongodb://localhost:27017/transport").then(() => {
            console.log("Database Connected");
        })
        console.log(`MongoDB connected : ${con.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB
