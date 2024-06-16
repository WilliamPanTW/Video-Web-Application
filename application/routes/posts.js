var express = require('express');
var router = express.Router();
var multer = require('multer');
var db = require('../conf/database');
const { getPostsbyId,getCommentsForPostById,makeThumbnail} = require("../middleware/posts");
const { isLoggedIn,isMyProfile } = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/videos/uploads')
    },
    filename: function (req, file, cb) {
      var fileExt = file.mimetype.split("/")[1];
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
    },
  });
  
const upload = multer({ storage: storage })


router.post(
  "/create",
  isLoggedIn,
  upload.single("uploadvideo"),
  makeThumbnail,
  async function(req,res,next){
    var{ title, description} =req.body;
    var{ path, thumbnail} =req.file;
    var{ userId} = req.session.user;

    try{
      var [instertResult, _ ] = await db.execute(
            `INSERT INTO posts (title,description,video,thumbnail,fk_userId) VALUE (?,?,?,?,?)`,
            [title,description,path,thumbnail,userId]
      );
      if(instertResult && instertResult.affectedRows){
        req.flash("success","Your post was created!");
        return req.session.save(function(error){
          if(error) next(error);
          return res.redirect(`/posts/${instertResult.insertId}`);
        }) 
      }else{
        next(new Error('Post could not be created'))
      }
    }catch(error){
      next(error)
    }
});

router.get('/:id(\\d+)',getPostsbyId,getCommentsForPostById,function(req,res){
  res.render('viewpost', { 
  title: `View post`,
  css: ["ViewPost.css"],
  js: ["ViewPost.js"], 
  });
}); 

router.get('/search', async function(req, res, next) {
  var { searchValue } = req.query;
  try {
    var [rows, _] = await db.execute(
      `SELECT id, title, thumbnail, CONCAT_WS(' ', title, description) AS haystack 
      FROM posts 
      HAVING haystack LIKE ?;`,
      [`%${searchValue}%`]
    );

    if (rows && rows.length === 0) {
      // No matching posts found
      return res.redirect('/');
    } else {
      res.locals.posts = rows;
      return res.render('index');
    } 
  } catch (error) {
    next(error);
  }
});


router.post('/delete', 
isLoggedIn,
async function(req, res, next) {
  var {userId,username } = req.session.user;
  var {postId,comment} = req.body;
  try {
    var [insertResult, _] = await db.execute(
      `DELETE FROM comments WHERE fk_postId = ?;`,
      [postId]
    );

    var [insertResult, _] = await db.execute(
      `DELETE FROM posts WHERE id = ?;`,
      [postId]
    );
    
    if (insertResult && insertResult.affectedRows == 1) {
      req.flash("success", 'You have deleted the post');
      return res.status(201).json({
        commentId: insertResult.insertId,
        username: username,
        commentText: comment,
      });
    } else {
      req.flash("error", "Post was not deleted");
      return res.json({
        message: "error"
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;