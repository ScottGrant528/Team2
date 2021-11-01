const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.listen(8080)

app.get('/', function(req,res){
    res.render('pages/login');
    console.log('---- Displaying Login page ----')
});

app.get('/register', function(req, res){
    res.render('pages/register')
    console.log('---- Displaying Register page ----')
});

app.get('/attendance', function(req, res){
    console.log('---- Displaying Attendance page ----')
});

app.get('/profile', function(req, res){
    console.log('---- Displaying Profile page ----')
});
/*
app.use(function(req, res, next) {
    console.log('---- 404 page being displayed');
    res.render('pages/404');
});
*/