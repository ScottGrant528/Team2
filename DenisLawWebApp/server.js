var express = require('express');
var app = express();
app.get('/', function(req, res){
 res.send("Hello world! by express");
});
app.get('/test', function(req, res){
    res.send("this is route 2");
});
app.use(express.static('/Team2/DenisLawWebApp/public'))
app.listen(8080);