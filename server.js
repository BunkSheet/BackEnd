const express = require('express');
port = process.env.PORT || 3000 ;

var app = express();
var hbs  = require('hbs');
app.set('view engine', 'hbs');
app.get('/', function (req, res) {
    res.render('maintenance');
});
require('./CraftyClown/main')(app);
require('./BlazeHunter/main')(app);
require('./Nitin/main')(app);
var server = require('http').Server(app);
var io = require('socket.io')(server);
//socket area

var admin = io.of('/admin');
admin.on('connection', function(socket){
  socket.join('adminRoom');
  socket.on('responseIssueBookApproval', function(data){
    var out = {
      rcode : data.rcode
    }
    console.log(data);
    user.to(data.regID).emit('responseIssueBook', out);
  });
});

var user = io.of('/user');
user.on('connection', (socket) => {
  socket.on('requestIssueBook', function(data){
    var current = new Date(); //'Mar 11 2015' current.getTime() = 1426060964567
    var followingDay = new Date(current.getTime() + 604800000); // + 1 day in ms
    console.log(data);
    var out = {
      regID : data.regID,
      bName : "Lean Startup",
      aName : "Eric Ries",
      ban : data.ban,
      date : followingDay.toLocaleDateString()
    }
    socket.join(data.regID);
    setTimeout(function () {
      var outData = {
        rcode : 3004
      }
      user.to(data.regID).emit('responseIssueBook', outData);
    }, 60000);
    admin.to('adminRoom').emit('requestIssueBookApproval', out);
  });
});

server.listen(port);

//
// out ={
//   regID : "C2k16105436",
//   code : 200
// }
