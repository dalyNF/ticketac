const mongoose = require('mongoose');

// useNewUrlParser ;)
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
 };

 //fackyyyyHACK:Fywou2BvnJRwmK9C
// --------------------- BDD -----------------------------------------------------
mongoose.connect('mongodb+srv://fackyyyyHACK:Fywou2BvnJRwmK9C@tiktak.godf7.mongodb.net/?retryWrites=true&w=majority',
   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database Ticketac connection : Success ***');
    }
   }
);