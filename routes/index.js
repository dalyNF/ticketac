var express = require('express');
var router = express.Router();

var journeyModel = require('../models/journey');
var userModel = require('../models/userModel');



var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('homepage');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/pasDeTrain', function(req, res, next) {
  res.render('pasDeTrain');
});

router.get('/ticketsAvailable', function(req, res, next) {
  res.render('ticketsAvailable');
});

// POST new user 
router.post("/sign-up" ,async function(req,res,next) {
   //cherche dans la bdd si l'email existe déja 
  var searchEmail = await userModel.findOne({email : req.body.signUpEmail})
  console.log(searchEmail);
  //si l'email n'y est pas
  if (!searchEmail) {
    //tu mets les infos du front dans la bdd
    var newUser = new userModel ({
      firstName: req.body.signUpFirstName,
      lastName: req.body.signUpName,
      email: req.body.signUpEmail,
      password: req.body.signUpPassword
      });
      console.log(newUser);
        var newUserSave = await newUser.save();
      // tu met ces infos dans la session
      req.session.user = {
        name: newUserSave.firstName,
        id: newUserSave._id,
      }
      //tu me redirige vers la homepage
      res.redirect ( "/")
  } else {
    res.redirect ("login")
  }
})

// SIGN IN 
router.post("/sign-in" , async function(req,res,next) {

  // var searchEmail = await userModel.findOne({
  //   email : req.body.signUpEmail,
  //   password:req.body.signUpPassword
  // }) ;

  // if(searchUser!= null){
  //   req.session.user = {
  //     name: searchEmail.firstName,
  //     id: searchUser._id
  //   }
  //   res.redirect('/')
  // } else {
  //   res.render('login')
  // } 
  res.redirect("/")
  
}) 


// Remplissage de la base de donnée, une fois suffit
router.get('/save', async function(req, res, next) {

  // How many journeys we want
  var count = 300

  // Save  ---------------------------------------------------
    for(var i = 0; i< count; i++){

    departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
    arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

    if(departureCity != arrivalCity){

      var newUser = new journeyModel ({
        departure: departureCity , 
        arrival: arrivalCity, 
        date: date[Math.floor(Math.random() * Math.floor(date.length))],
        departureTime:Math.floor(Math.random() * Math.floor(23)) + ":00",
        price: Math.floor(Math.random() * Math.floor(125)) + 25,
      });
       
       await newUser.save();

    }

  }
  res.render('homepage', { title: 'Express' });
});


// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get('/result', function(req, res, next) {

  // Permet de savoir combien de trajets il y a par ville en base
  for(i=0; i<city.length; i++){

    journeyModel.find( 
      { departure: city[i] } , //filtre
  
      function (err, journey) {

          console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
      }
    )

  }


  res.render('homepage', { title: 'Express' });
});

module.exports = router;
