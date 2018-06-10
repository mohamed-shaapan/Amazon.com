/* IMPORT REQUIRED MODULEs */
/*********************************************/
var express = require('express');
var app = express();

/* CREATE WEB SERVER */
/*********************************************/
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

/* REQUEST-ROUTING TABLE */
/*********************************************/
/* access files directly from server */
app.use(express.static('public'));


app.get('/', function (req, res) {
   res.send('Hello World');
})








