var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//Todo is the model
var Notice  = mongoose.model('Notice',{
  title:{
    type:String,
    required:true, //text is required
    minlength:1,
    trim: true    //removes whitespaces from start and end
  },
  nbody:{
    type:String,
    required:true
  },
  noticeimage:{
    type:String,
    default:"default"
    },
  Id:{
    type:Number
  },
 flag:{
    type:Boolean,
    default:true
  },
  timestamp:{
      type:String
  }
});

module.exports = {
  Notice
};
