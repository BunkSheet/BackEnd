var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//Todo is the model
var User  = mongoose.model('User',{
  expoToken :{
    type:String,
    unique : true,
    required:true,
    minlength:20,
    trim: true
  }
});

module.exports = {
  User
};
//ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
