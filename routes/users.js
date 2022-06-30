var express = require('express');
var router = express.Router();

var userModel = require('../models/userModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  

  res.render('login');
});

// POST new user 
// router.post("/sign-up" , function(req,res,next) {
//   // req.session.user = [];
//   console.log(req.body);

//   // var newUser = new userModel ({
//   //   lastname: "Doe",
//   //   firstname: "Maria",
//   //   email:  "maria.doe@gmail.com",
//   //   password:"aaa"
//   //   });
    
//   //   var userSaved = await newUser.save();

//   res.render('login') ;
// })

module.exports = router;
