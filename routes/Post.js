const Router  = require('express').Router();
const Post = require('../models/Post');



Router.get('/',(req,res)=>{
    res.render('admin/index',{layout: 'admin'})
})
//GET POST
Router.get('/post',(req,res)=>{
    if(!req.session.USERID ){
        res.status(401).send('unauthorized');
    }
    else{
        res.render('admin/posts/create-post',{layout: 'admin'})
    }

});

//SEND A POST
Router.post('/post',(req,res)=>{

    if(!req.session.USERID ){
        res.status(401).send('unauthorized');
    }
    else{
        const file = req.files;
        const filename =  Date.now() + "_" + file.file.name;
        let allowComments = false;
        if(req.body.allowComments==='on'){
            allowComments = true;
        }
        else {
            allowComments = false;
        }
        const post = new Post({
          title: req.body.title,
          body: req.body.body,
          allowComments: allowComments,
          file: filename
        });
        post.save()
            .then(()=> {

                file.file.mv('/uploads/' + filename,(err)=>console.log(err))
                res.send('done')
            })
            .catch(err=>console.log(err));

    }

});

//GET POSTS
Router.get('/posts',(req,res)=>{
    if(!req.session.USERID ){
        res.status(401).send('unauthorized');
    }

    else{
        Post.find({})
            .lean()
            .then(posts=>{
                res.render('admin/posts/posts-list',{layout: 'admin', posts})
            })
            .catch(err=>err);
    }


});

///GET SPECIFIC POST

Router.get('/posts/:ID',(req,res)=>{
    if(!req.session.USERID ){
        res.status(401).send('unauthorized');
    }
    else{
        res.status(200).send(req.session)
    }

});




///UPDATE POST ROUTES

//GET EDIT ROUTE FOR SPECIFIC POST
Router.get('/posts/edit/:ID',(req,res)=>{
    const id = req.params.ID;
    if(!req.session.USERID ){
        res.status(401).send('unauthorized');
    }
    else{
        Post.find({})
        res.render('admin/posts/edit-post',{layout: 'admin'})
    }

});
Router.get('/posts/edit/:ID',(req,res)=>{
    if(!req.session.USERID ){
        res.status(401).send('unauthorized');
    }
    else{
        res.status(200).send(req.session)
    }

});




module.exports = Router;