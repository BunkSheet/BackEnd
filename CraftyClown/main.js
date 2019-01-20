var alias = '/cc';

const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var url = "mongodb://dbuser:Dbuser123@ds161134.mlab.com:61134/bunksheet";

mongoose.connect(url)
    .then((result)=>console.log(`Connected to db`))
    .catch((err)=>console.log(err));

const {User}  = require(process.cwd() + '/models/user');
const {Books}  = require(process.cwd() + '/models/books');
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
      (async () => {
        tokens = []
        User.find({},(error, users) => {
          for (let user of users) {
            tokens.push(user.expoToken);
          }
          console.log(tokens);
        })
      })();

        res.send('All The send');
    });


    app.get(alias + '/getAllBooks', (req, res) => {
      Books.find({},(error, books)  => {
        res.send(books);
      })

    });
    app.get(alias + '/getAllBooksCount', (req, res) => {
      Books.find({},(error, books)  => {
        out = {
          count : books.length
        }
        res.send(out);
      })
    });
}
