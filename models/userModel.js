const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
  });
  
  var userModel = mongoose.model('users', userSchema);

  module.exports = userModel;