const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.listen(8080)

app.get('/', function(req,res){
    res.render('pages/login');
});