const Router  = require('express').Router();

//GET POST
Router.get('/post',(req,res)=>{

    res.render('admin/posts/create-post',{layout: 'admin'})
});

//SEND A POST
Router.post('/post',(req,res)=>{
    res.status(200).send('posts')
});

//GET POSTS
Router.get('/posts',(req,res)=>{
    res.status(200).send('posts')
});

///GET SPECIFIC POST

Router.get('/posts/:ID',(req,res)=>{
    res.status(200).send('posts WITH ID')
});



module.exports = Router;