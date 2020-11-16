const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username:{
        type: String,
        min:2,
        required: true,
    },
    email:{
        type: String,
        min:4,
        required:true,
    },
    password:{
        type: String,
        min:8,
        required: true,
    },
    terms: String,
});

module.exports = new mongoose.model('user',User);