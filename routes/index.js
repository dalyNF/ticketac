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
   req.session.user = [];

  // console.log(req.body);
  var newUser = new userModel ({
    firstName: req.body.signUpName,
    lastName: req.body.signUpFirstName,
    email: req.body.signUpEmail,
    password: req.body.signUpPassword
    });
    
     var userSavedBdd = await newUser.save();
    //  console.log(userSavedBdd);

    var userSaved = await userModel.find( {email : req.body.signUpEmail})
    
    req.session.user.push({
      firstName: userSaved.firstName,
      lastName: userSaved.lastName,
      email: userSaved.email,
      password: userSaved.password
    }) 

    console.log("----->",req.session.user.firstName);
    // if (req.session.user !== undefined ){
    //   res.redirect("homepage", userSaved) ;
    // }
    // else {
    //   res.redirect('login' , userSaved) ;
    // }
    res.redirect ("login")
})

// SIGN IN 
router.get("/sign-in" , async function(req,res,next) {
      

  res.redirect("homepage")
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
