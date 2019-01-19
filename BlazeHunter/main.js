var alias = '/bh';
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/LibraryDB')
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
        
        newnotice.save().then((doc)=>{
            console.log(doc);
            res.send(doc);
        },(err)=>{
            console.log(process.cwd());
            
            console.log(err);
            
        })

    });
}
