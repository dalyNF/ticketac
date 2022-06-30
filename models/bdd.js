const mongoose = require('mongoose');

// useNewUrlParser ;)
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
 };

 // mongodb+srv://daly:3dom4bdd@atlascluster.ewlspmp.mongodb.net/ticketac?

// --------------------- BDD -----------------------------------------------------
mongoose.connect('mongodb+srv://fackyyyyHACK:Fywou2BvnJRwmK9C@tiktak.godf7.mongodb.net/tiktak?',
   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database Ticketac connection : Success ***');
    }
   }
);