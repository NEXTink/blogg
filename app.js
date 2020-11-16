const express = require('express');
const app = express();
const path  = require('path');
const bodyParser =require('body-parser');
const expressHandleBar = require('express-handlebars');
app.use(express.static(path.join(__dirname,'public')));
const PostRoutes = require('./routes/Post');
const AuthRoutes = require('./routes/authRoute');
const dotenv = require('dotenv');
dotenv.config();
const DB = require('./config/db');
const User = require('./models/User');
const session = require('express-session');
const mongoStore = require('connect-mongo');




///middlewares
app.use(session(
    {
      secret: process.env.SESSION_SECRET,
      cookie: { secure: true},
      resave: false,
      saveUninitialized: true,

    }
))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.engine('handlebars', expressHandleBar({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');




app.get('/',async(req,res)=>{


  const users = await User.find({})
      .lean();

    res.render('home/index',{users});
});

///ROUTES
app.use('/admin',PostRoutes);
app.use('/api/auth',AuthRoutes)

app.listen(5000,()=>console.log('listening on port 5000'))