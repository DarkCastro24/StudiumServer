const Mongoose = require("mongoose");

const debug = require('debug')("app:database");

const dbhost = process.env.DBHOST || "localhost";
const dbport = process.env.DBPORT || "27017";
const dbname = process.env.DBNAME || "studium";

const dburi = process.env.DBURI || 'mongodb+srv://Kstro:r2qpMCJwo8oddD37@studium.rcn9oqq.mongodb.net/?retryWrites=true&w=majority';

/*
    Connect to database method
*/
const connect = async() => {
    try {
        await Mongoose.connect(dburi);
        debug("Connection to database started");
    } catch (error) {
        console.error(error);
        debug("Cannot connect to database");
        process.exit(1);
    }
}

/*
    Disconnect to database method
*/
const disconnect = async() => {
    try {
        await Mongoose.disconnect();
        debug("Connection to database end");
    } catch (error) {
        process.exit(1);
    }
}

module.exports = {
    connect, 
    disconnect
}