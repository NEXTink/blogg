const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    title:{
        type: String,
        min:2,
        required: true,
    },
    body:{
        type: String,
        min:4,
        required:true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    file: String,
    Status: String,
    admin: {
        type: Boolean,
        default: false,
    }
});

module.exports = new mongoose.model('post',Post);