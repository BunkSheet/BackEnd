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

app.listen(port);
