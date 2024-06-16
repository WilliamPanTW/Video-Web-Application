// npm i validator
var validator = require('validator');
//import database
var db = require('../conf/database');
const alpha = /(?=.*[A-Za-z])/;
const hasupper = /(?=.*[A-Z])/;
const hasnumber = /(?=.*[0-9])/;
const hasspecial = /(?=.*[\/\*\-\+\!\@\#\$\^\&\~\[\]])/;

module.exports= {
    usernameCheck: function(req,res,next){
        var {username} =req.body;
        username = username.trim(); //No space 
        if(!validator.isLength(username,{min:3})){
            req.flash("error","username must be 3 or more charactrs")
        }

        if(!alpha.test(username.charAt(0))){
            req.flash("error","username must begin with a character")
        }

        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },

    emailCheck: function(req,res,next){
        var {email} =req.body;
        if(!validator.isEmail(email)){
            req.flash("error", `${email} is not a valid email address`)
        }

        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            console.log(req.body);
            next();
        }
    },

    passwordCheck: function(req,res,next){
        var {password} =req.body;
        if(!validator.isLength(password,{min:8})){
            req.flash("error","Password must be 8 or more charactrs")
        }

        if(!hasupper.test(password)){
            req.flash("error","Password must contain at least 1 upper case letter")
        }

        if(!hasnumber.test(password)){
            req.flash("error","Password must contain at least 1 number")
        }

        if(!hasspecial.test(password)){
            req.flash("error","Password must contain at least 1 special character")
        }

        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },

    comfirmPassword: function(req,res,next){
        var {cPassword} =req.body;
        var {password} =req.body;
        if(cPassword !== password){
            req.flash("error","Comfirm Password must be same as Password")
        }

        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },

    ageCheck: function(req,res,next){
        var {ageCheck} =req.body;
        if (!ageCheck) { 
            req.flash("error", "Are you 13 or not ? ");
          } else if (ageCheck === "no") {
            req.flash("error", "You must be at least 13 to register");
          }
        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },

    tosCheck: function(req,res,next){
        var {tosCheck} =req.body;

        if(!tosCheck){
            req.flash("error","You must read and accept the tos policy")
        }

        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },
   
    isUserNameUnique: async function(req,res,next){
        var {username} = req.body;
        try{
             // check username unique
            var [rows,fields] = await db.execute(
                `SELECT id from users where username=?;` ,
                [username]
            ); 
            
            // if user is exist in sql 
            if(rows && rows.length > 0 ){
                req.flash("error",`${username} is already taken`);
                return req.session.save(function(err){
                    return res.redirect('/registration');
                });
            }else {
                next();
            }

            }catch(error){
                next(error)
            }
    },
    isEmailUnique: async function(req,res,next){
        var {email} = req.body;
        try{
            // check email unique
            var [rows,fields] = await db.execute(
                `SELECT id from users where email=?;` ,
                [email]
            ); 
            if(rows && rows.length > 0 ){
                req.flash("error",`${email} is already taken`);
                return req.session.save(function(err){
                    return res.redirect('/registration');
                });
            }else{
                next();
            }
        }catch(error){
            next(error)
        }
    },
}