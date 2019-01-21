var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var Backup  = mongoose.model('Backup',{
    ISBN:{
        type:String,
        required:true, //text is required
        minlength:1,
        trim: true    //removes whitespaces from start and end
      },
      ACNO:{
        type:String,
        required:true, //text is required
        minlength:1,
        trim: true    //removes whitespaces from start and end
      },
      SELFLINK:{
        type:String,
        required:true, //text is required
        minlength:1,
        trim: true    //removes whitespaces from start and end
      },
      timeStamp:{
        type:String,
        required:true, //text is required
        minlength:1,
        trim: true    //removes whitespaces from start and end
      },

});

module.exports = {
 Backup
};
