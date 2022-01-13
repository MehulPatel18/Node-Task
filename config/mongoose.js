const mongoose = require('mongoose');

mongoose.connect(`DATABASE STRING`);
const db = mongoose.connection;

db.on('error', console.error.bind("Error while connecting to Database"));

db.once('open', () => {
    console.log("Connected to the Database");
});

module.exports = db;
