//TODO
// Allow users to log in with their credentials on your application.
// • Allow users to log out of your application.
// • Allow users to view their profile page with populated user information
var express = require('express');
var router = express.Router();
var db =require('../conf/database');
var bcrypt =require('bcrypt');
var {isLoggedIn, isMyProfile} = require("../middleware/auth");
const { usernameCheck, isUserNameUnique, passwordCheck,comfirmPassword, emailCheck, tosCheck, ageCheck, isEmailUnique } = require('../middleware/validation');
const { getPostsForUser } = require("../middleware/posts");

/* GET users listing. */
//localhost: 3000/users
router.get('/',async function(req, res, next) {
  // res.send('respond with a resource');
  try{
    let [rows,fileds]= await db.query(`select * from ${process.env.DB_NAME}.users;`);
    res.status(200).json({rows,fileds});
  }catch(error){
      next(error);
  }
  // db.query('select * from users;',function(error,rows){
  //   if(error){
  //     next(error); //trigger app.error
  //   } 
  //   res.status(200).json({rows}); // browser(send sql requst) -> server(respond) -> browser 
  // }) //callback function is not available with promise clients
});

// sanitize html
// router.use('/register',function(req, res, next) {
//   //validate data here
//   if(dataisgood){
//     next();
//   }else{
//     res.redirect('/register');
//   }
// });


router.post('/register', 
  usernameCheck,
  emailCheck, 
  passwordCheck,
  comfirmPassword,
  ageCheck, 
  tosCheck,
  isUserNameUnique, 
  isEmailUnique,
  async function(req, res, next) {
  var {username,email,password} = req.body;
  try{
    console.log(req.body);
    // hashing password 
    var hasedPassword = await bcrypt.hash(password, 3);
    // insert
    var [resultObject , fields] = await db.execute(
        `INSERT INTO ${process.env.DB_NAME}.users 
    (email, password, username) 
    value 
    (?,?,?);`,[email,hasedPassword,username]);
    // respone
    if(resultObject && resultObject.affectedRows == 1 ) {
      return res.redirect("/login");
    } else{
      return res.redirect("/registration");
    }
  }catch(error){
    next(error);
  }
});

router.post('/login', async function(req, res, next) {
  const {username,password} = req.body;
  if(!username){ //check if username is empty
    req.flash("error","Please fill in username");
    return res.redirect("/login"); 
  } else if(!password){ //check if password is empty
    req.flash("error","Please fill in password");
    return res.redirect("/login");
  } else{
    var [rows,fields] = await db.execute(
      `SELECT id,username,password,email FROM users WHERE BINARY username=?;` ,
      [username]
    ); 

    var user = rows[0];//get first row   
    if(!user){//check if user exist in sql 
      req.flash("error","log in failed: invalid username");
      req.session.save(function(err){//redirect is async tag that may faster than save the old one 
        return res.redirect("/login");
      })
    } else{
      var passwordsMatch =await bcrypt.compare(password,user.password);
      if(passwordsMatch) {
        req.session.user = {
          userId: user.id,
          email: user.email,
          username: user.username
        };
        req.flash("success",'You are now logged in');
        req.session.save(function(err){//redirect is async tag that may faster than save the old one 
          return res.redirect("/home");
        })
      }else {
        req.flash("error","log in failed: invalid password");
        return res.redirect("/login");
      }
    }
  }
});

//route protecter-prevent going profile without login
router.use(function(req,res,next){
  if(req.session.user){
    next();
  }else{
    return res.redirect('/login')
  }
})

router.get('/profile/:id(\\d+)',isLoggedIn,isMyProfile,getPostsForUser, function(req,res){
  res.render('profile', { 
    title: 'Profile', 
    css:["Profile.css"],
    });
});

router.post('/logout', isLoggedIn , function(req, res, next) {
  req.session.destroy(function(err){
    if(err){
      next(error);
    }
    return res.redirect('/home')
  })
});

module.exports = router;
