var express = require('express');
var app = express();
var db = require('./db');

var UserController = require('./controllers/UserController');
app.use('/users', UserController);

app.get('/get.cgi', (req, res) => {
    if (req.query["req"] == "ping")
        res.send("#PING|600002|192.168.0.111|1.5.5|Hamlet Leon 1|255.0.0.0|10.5.9.8|0|239|000000000000|6/30/2017 12:59:59 PM|N|shows/My Show|1|1|0.0.0.0|0.0.0.0|0")
    else
        res.send("<h1>Unknown Command</h1>")
})

module.exports = app;