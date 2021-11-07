//loading external applications to run the server
const express = require('express');
const app = express();
const session = require('express-session');
/*mongodb initialisation
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/DLLT_Users";
*/
//server side stuff
app.set('view engine', 'ejs');
//app.set('views', __dirname + '/views')
//app.use(express.static(__dirname +  '/public'));
app.use(express.static("public"));
app.use(session({ 
    secret: 'example',
    resave: true,
    saveUninitialized: true
}));
app.use(express.urlencoded({extended:true}))


app.listen(8080);

//Default page
app.get('/', function(req,res){
    res.render('pages/Home');
    console.log('---- Displaying Home page ----')
});

//Login page
app.get('/login', function(req, res){
    res.render('pages/login')
    console.log('---- Displaying login page ----')
});

//Register page
app.get('/register', function(req, res){
    res.render('pages/register')
    console.log('---- Displaying Register page ----')
});

//Attendane Page
app.get('/Mark-Attendance', function(req, res){
    res.render('pages/Mark-Attendance')
    console.log('---- Displaying Attendance page ----')
});

//Profile Page
app.get('/profile', function(req, res){
    res.render('pages/profile')
    console.log('---- Displaying Profile page ----')
});

//Home Page
app.get('/Home', function(req, res){
    res.render('pages/Home')
    console.log('---- Displaying Home page ----')
});

//News Page
app.get('/Latest-News', function(req, res){
    res.render('pages/Latest-News')
    console.log('---- Displaying Latest News page ----')
});

/*
var db;
MongoClient.connect(url, function(err, database){
  if(err) throw err;
  db = database;
  app.listen(8080);
});
*/