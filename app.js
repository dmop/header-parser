const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const port = process.env.PORT || 8080;
// create express app
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('tiny'));

// define a simple route
app.get('/whoami', function (req, res) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    var language = req.headers["accept-language"].split(',')[0];
    var software = req.headers['user-agent'].split(" ").slice(1,4).join(" ").slice(1, -1);;
    res.status(200).json({ "ipaddress": ip, "language": language, "software": software });
});

// listen for requests
app.listen(port, function () {
    console.log("Server is listening on port " + port);
});