var alias = '/bh';
const express = require('express');
const multer = require('multer');
const expoN = require(process.cwd() + '/notify.js');
const bodyParser = require('body-parser');
const fs = require('fs');
const _ = require('lodash');

var mongoose = require('mongoose');
const {User}  = require(process.cwd() + '/models/user');
// root url https://mighty-hollows-23016.herokuapp.com/

var url = "mongodb://dbuser:Dbuser123@ds161134.mlab.com:61134/bunksheet";
//var url = 'mongodb://localhost:27017/LibraryDB';
mongoose.connect(url)
    .then((result)=>console.log(`Connected to db Ayush`))
    .catch((err)=>console.log(err));

const {Notice}  = require(process.cwd() + '/models/notices');

const storage = multer.diskStorage({    //cb is callback
    destination:function(req,file,cb){
      cb(null,'public/noticeImages');
    },
    filename:function(req,file,cb){
      cb(null,new Date().toISOString()+"-"+file.originalname);
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
            timestamp:new Date().toLocaleString()
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


    app.get(alias + '/getnotices' , async (req,res)=>{
        var notices,count;
       await Notice.find({"flag":true}).then((docs)=>{
            //console.log(docs);
            //res.send({docs});
            notices = docs;
            //display(notices);
        },(err)=>{
            console.log(err);

        });
        await Notice.find({"flag":true}).count().then((counts)=>{
            console.log(counts);
            count = counts;
        },(err)=>{
            console.log(err);

        });
        console.log(notices);
        var notinfo = {
            notices:notices,
            activecount:count
        }
        res.send(notinfo);

    });

    app.post(alias + '/removenotice',(req,res)=>{
       // var rid = req.params.Id;

        var rid = parseInt(req.body.Id);
        //console.log(_.isString(rid));
        //res.send(JSON.stringify({rid}));


        Notice.findOneAndUpdate({Id:rid},{$set:{"flag":false}}).then((doc)=>{
            //console.log(doc.noticeimage);
            var rm = process.cwd()+"/"+doc.noticeimage;
            console.log(rm);

        //     fs.unlink(rm,function(err){
        //         if(err) return console.log(err);
        //         console.log('file deleted successfully');
        //    });
            res.send(doc);
        },(err)=>{
            console.log(err);

        });

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
