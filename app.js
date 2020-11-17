const express = require('express');
const app = express();
const path  = require('path');
const bodyParser =require('body-parser');
const fileUpload = require('express-fileupload');
const expressHandleBar = require('express-handlebars');
app.use(express.static(path.join(__dirname,'public')));
const PostRoutes = require('./routes/Post');
const AuthRoutes = require('./routes/authRoute');
const dotenv = require('dotenv');
dotenv.config();
const DB = require('./config/db');
const User = require('./models/User');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);


///session store

const sessionStore = new mongoStore({
    mongooseConnection: DB,
    collection: 'sessions'
})

///middlewares
app.use(session(
    {
      secret: process.env.SESSION_SECRET,
      cookie: {
          // secure: true,
          httpOnly: true,
          maxAge: 1000 * 3600 * 24,
          // path:'/admin'
      },
      name: 'userRefIdTableControl',
      resave: false,
      saveUninitialized: true,
      store: sessionStore,
    }
));
app.use(fileUpload())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.engine('handlebars', expressHandleBar({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');




app.get('/',async(req,res)=>{
    res.render('home/index')
});

///ROUTES
app.use('/admin',PostRoutes);
app.use('/api/auth',AuthRoutes)

app.listen(5000,()=>console.log('listening on port 5000'))