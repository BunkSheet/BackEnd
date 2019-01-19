var alias = '/bh';
const express = require('express');
const multer = require('multer');
const expoN = require(process.cwd() + '/notify.js');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const {User}  = require(process.cwd() + '/models/user');
var url = "mongodb://dbuser:Dbuser123@ds161134.mlab.com:61134/bunksheet";
//var url = 'mongodb://localhost:27017/LibraryDB';
mongoose.connect(url)
    .then((result)=>console.log(`Connected to db`))
    .catch((err)=>console.log(err));

const {Notice}  = require(process.cwd() + '/models/notices');

const storage = multer.diskStorage({    //cb is callback
    destination:function(req,file,cb){
      cb(null,'public');
    },
    filename:function(req,file,cb){
      cb(null,file.originalname);
    }
});

const upload = multer({storage:storage});

// var upload = multer({ dest: 'uploads/' })

module.exports = function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/public',express.static('public'));



    app.get(alias + '/test', function(req, res){
        console.log(process.cwd());

        res.send('test');
    });

    app.post(alias + '/addnotice' ,upload.single('noticeimage'),(req,res)=>{
        console.log(req.file);

        var newnotice = new Notice({
            title:req.body.title,
            nbody:req.body.nbody,
            noticeimage:req.file.path,
            Id:req.body.Id,
            timestamp:new Date().valueOf()
        });
        console.log(newnotice);
        notice = {
          title : req.body.title,
          body:req.body.nbody,
        }
        newnotice.save().then((doc)=>{
            console.log(doc);
            sendNoticeToUser(notice);
            res.send(doc);
        },(err)=>{
            console.log(process.cwd());

            console.log(err);

        })

    });

    function sendNoticeToUser(notice){
      (async () => {
        tokens = []
        User.find({},(error, users) => {
          for (let user of users) {
            tokens.push(user.expoToken);
          }
          console.log(tokens);
          expoN.sendNotifiaction(tokens,notice);
        })
      })();
    }
}
