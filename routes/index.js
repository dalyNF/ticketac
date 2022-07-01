var express = require('express');
var router = express.Router();

var journeyModel = require('../models/journey');
var userModel = require('../models/userModel');



var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]



/* GET home page. */
router.get('/', function(req, res, next) {

  //ajout de compte non existant méthode weatherapp
  //  if(req.session.user == undefined){
  //   req.session.user = []; 
  //   res.redirect("login") ;
  // } 
  // console.log(req.session.user);
  res.render('homepage', {userInfo : req.session.user});
});

router.get('/login', function(req, res, next) {
  if(req.session.user == undefined){
    req.session.user = [];  
  } 
  res.render('login', {userInfo : req.session.user});
});

router.get('/pasDeTrain', function(req, res, next) {
  res.render('pasDeTrain');
});

router.get('/ticketsAvailable', function(req, res, next) {
  res.render('ticketsAvailable');
});

router.get('/myTicket', function(req, res, next) {
  res.render('myTicket', {newJourney:req.session.newJourney});
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
      res.redirect ( "/",{userInfo : req.session.user} )
  } else {
    res.render ("login", {userInfo : req.session.user})
  }
})

// SIGN IN 
router.post("/sign-in" , async function(req,res,next) {

   var searchEmail = await userModel.findOne({
     email : req.body.email,
     password:req.body.password
   }) ;
   
   if(searchEmail!== null){
     req.session.user = {
       name: searchEmail.firstName,
       id: searchEmail._id
    }
     res.redirect('/') ;
   } else if (searchEmail == null){
     res.render('login') ;
   } 


  

  console.log(req.session.user);

}) 

router.get("/deconnexion" , function (req,res,next) {

  req.session.user = null;

  res.redirect('/login')
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
  res.render('/');
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

// Post reservation : 
router.post ("/reservation" , async function (req,res,next) {
  // console.log(req.body.departureCity);
  var newJourney = await journeyModel.find({ 
    departure: req.body.departureCity,
    arrival: req.body.arrivalCity,
    date: req.body.journeyDate,
  }
)

req.session.user = {newJourney:req.session.newJourney};

console.log("find--->" ,newJourney);

  if ( newJourney.length > 0) {

    res.render("ticketsAvailable" , {newJourney}) ;
  } 
  else   {
    res.redirect ("pasDeTrain");
  }
});

// Route myLastTrips



router.get('/myLastTrips', function(req, res, next) {

  res.render('myLastTrips');
});

module.exports = router;


// EXEMPLE TEST DES TRAJETS (cf. form ligne 25 homepage)

/* router.post('/journeys', async function(req, res, next){

  var departureCity = req.body.departureCity;
  var arrivalCity = req.body.arrivalCity;
  var dateDeparture = req.body.journeyDate;

  var journey = await journeyModel.find({
    departure: departureCity,
    arrival: arrivalCity,
    date: dateDeparture
  })



})
 */


/* var searchUser = await userModel.findOne({
  email: req.body.emailFromFront
})

if(!searchUser){
  var newUser = new userModel({
    name: req.body.usernameFromFront,
    email: req.body.emailFromFront,
    password: req.body.passwordFromFront,
  })

  var newUserSave = await newUser.save();

  req.session.user = {
    name: newUserSave.name,
    id: newUserSave._id,
  }
  if(req.session.panier === undefined){
    req.session.panier=[]
  }
  res.redirect('/homepage')
} else {
  res.redirect('/')
}

}) */