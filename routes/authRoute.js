const Router  = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
//GET POST
Router.post('/login', async(req,res)=>{
    // res.render('alerts/success')

    const validUser = await User.findOne({email: req.body.email});
    const validPassword = bcrypt.compare(req.body.password, validUser.password);
    if(validUser && validPassword){
        res.redirect('/')
    }
    else{
        return   res.status(403).send('error found')
    }

});

//SEND A POST
Router.post('/register',async (req,res)=>{


   const validUser = await User.findOne({email: req.body.email});

   const salt = await bcrypt.genSalt(12);
   const hashedPassword = await bcrypt.hash(req.body.password,salt);
   if(!validUser){
       let user = new User({username: req.body.username,password: hashedPassword,email: req.body.email,terms:req.body.terms});
       user.save()
           .then(data=> res.status(200).send(data))
           .catch(err=> console.log(res.status(403).send('error')))
   }
   else{

     return   res.status(403).send('error found')
   }
});



//GET REQUESTS ROUTES

Router.get('/login',(req,res)=>{
    res.render('auth/login');
});

//SEND A POST
Router.get('/register',(req,res)=>{
    res.render('auth/register');
});




module.exports = Router;