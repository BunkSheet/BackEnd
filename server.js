const express = require('express');
port = process.env.PORT || 3000 ;
var app = express();

require('./CraftyClown/main')(app);
require('./BlazeHunter/main')(app);
require('./Nitin/main')(app);

app.listen(port);
