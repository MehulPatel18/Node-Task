const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSignupSchema = new Schema({
    email: {
        type: String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required : true
    }
}, { timestamp:true});

module.exports = mongoose.model('Userinfo', userSignupSchema);