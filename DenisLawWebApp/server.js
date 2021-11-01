// load the external applications needed 
var express = require('express');
const session = require('express');
var app = express();

//setting the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(session({ secret: 'example' }));

app.use(express.urlencoded({extended:true}));

//login
app.get('/', function(req, res){
    res.render('pages/login');
})

//register
app.get('/register', function(req, res){
    res.render('pages/register');
})

//profile
app.get('/profile', function(res,req){
    res.render('pages/profile');
})

//attendance
app.get('/attendance', function(req, res){
    res.render('pages/attendance');
})

//default 404 page
app.use(function(req, res, next) {
    res.render('pages/404');
});

app.listen(8080);