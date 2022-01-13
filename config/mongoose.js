const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://mehul:NRA2HsiQFJkfd9Xq@cluster0.r4dhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
const db = mongoose.connection;

db.on('error', console.error.bind("Error while connecting to Database"));

db.once('open', () => {
    console.log("Connected to the Database");
});

module.exports = db;
