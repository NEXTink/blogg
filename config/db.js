const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECT,{useUnifiedTopology:true,useNewUrlParser:true});

const DB = mongoose.connection;

DB.on('error',()=>console.log('error in connection'));
DB.on('open',()=>console.log('connected to DB'));

module.exports = DB;