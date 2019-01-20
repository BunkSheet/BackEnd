var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var Backup  = mongoose.model('Backup',{
    Isbn:{
        type:String,
        required:true, //text is required
        minlength:1,
        trim: true    //removes whitespaces from start and end
      },
      AcNo:{
        type:String,
        required:true, //text is required
        minlength:1,
        trim: true    //removes whitespaces from start and end
      },

});

module.exports = {
 Backup
};