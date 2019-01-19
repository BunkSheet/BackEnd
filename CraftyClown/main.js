var alias = '/cc';

const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var url = "mongodb://dbuser:Dbuser123@ds161134.mlab.com:61134/bunksheet";

mongoose.connect(url)
    .then((result)=>console.log(`Connected to db`))
    .catch((err)=>console.log(err));

const {User}  = require(process.cwd() + '/models/user');
module.exports = function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    app.post(alias+ '/addExpoToken', (req, res) => {
      var user = new User({
        expoToken : req.body.expoToken
      });
      user.save().then((document) => {
        console.log(document);
      },
      (e) => {
        console.log(e);
      }
    )
    res.send("Done")
  });


    app.get(alias + '/test', function(req, res){
        res.send('test');
    });


    app.get(alias + '/sendToAll', (req, res) => {
        res.send('test');
    });

}
