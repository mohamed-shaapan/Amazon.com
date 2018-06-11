/* IMPORT REQUIRED MODULEs */
/*********************************************/
var express = require('express');
var app = express();
var path    = require("path");

/* CREATE WEB SERVER */
/*********************************************/
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

/* REQUEST-ROUTING TABLE */
/*********************************************/
/* respond to GET request */
app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name: "mohamed", //req.query.first_name,
      last_name: "shaban" //req.query.last_name
   };

   res.end(JSON.stringify(response));
})


app.get('/', function (req, res) {

   res.sendFile(path.join(__dirname+'/index.html'));

})








