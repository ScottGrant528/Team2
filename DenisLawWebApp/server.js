//loading external applications to run the server
const express = require('express');
const app = express();

//server side stuff
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.listen(8080)

//Default page
app.get('/', function(req,res){
    res.render('pages/login');
    console.log('---- Displaying Login page ----')
});

//Register page
app.get('/register', function(req, res){
    res.render('pages/register')
    console.log('---- Displaying Register page ----')
});

//Attendane Page
app.get('/attendance', function(req, res){
    res.render('pages/attendance')
    console.log('---- Displaying Attendance page ----')
});

//Profile Page
app.get('/profile', function(req, res){
    res.render('pages/profile')
    console.log('---- Displaying Profile page ----')
});
