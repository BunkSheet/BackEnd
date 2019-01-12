const express = require('express');

var app = express();

require('./CraftyClown/main')(app);
require('./BlazeHunter/main')(app);
require('./Nitin/main')(app);

app.listen(3000);
