var express = require('express');
var router = express.Router();
const { isLoggedIn } = require("../middleware/auth");
const { getRecentPosts } = require('../middleware/posts');

router.use(function(req,res,next){
  req.userIsLoggedIn=true;
  next(); 
})

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'CSC 317 Home' });
});

router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name: "William Pan" });
});


//just need request and respond with hbs
//route handler that respomd to request
router.get('/login',function(req,res){
  res.render('login', { title: 'CSC 317 login', css:["Login.css"]});
});

router.get('/registration',function(req,res){
  res.render('registration', { title: 'Registration', 
  css:["Register.css"],
  js: ["validation.js"],
  });
});

router.get('/postVideo', isLoggedIn , function(req,res){
  res.render('postvideo', { title: 'Post video', css:["PostVideo.css"]});
}); 



module.exports = router;
