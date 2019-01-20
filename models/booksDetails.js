var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var Book  = mongoose.model('Book',{
    data: {
        type: String,
        get: function(data) {
          try { 
            return JSON.parse(data);
          } catch(err) { 
            return data;
          }
        },
        set: function(data) {
          return JSON.stringify(data);
        }
      }

});

module.exports = {
 Book
};