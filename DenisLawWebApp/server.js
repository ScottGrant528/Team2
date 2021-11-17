//loading external applications to run the server
const express = require('express');
const session = require('express-session');
const app = express();

//mongodb initialisation
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/DLLT_Users";

//server side stuff
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use(express.static(__dirname +  '/public'));
app.use(express.static(__dirname + '/jquery.js'));
app.use(express.static(__dirname + '/nicepage.js'));

//Session used to remember if user is logged in between pages

app.use(session({ 
    secret: 'dllt_secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.urlencoded({extended:true}))

//Database initialisation
var db

MongoClient.connect(url, function(err, database){
    
    if(err) throw err;
    db = client.database;
    app.listen(8080);
    console.log('Database ready.')
})

//Default page
app.get('/', function(req,res){
    res.render('pages/Home');
    console.log('---- Displaying Default page ----')
});

//home page
app.get('/Home', function(req, res){
    res.render('pages/Home')
    console.log('---- Displaying Home page ----')
});

//Login page
app.get('/login', function(req, res){
    if(req.session.loggedin){
        res.redirect("pages/profile")
        console.log("---- Already logged in. Redirecting to profile ----")
    }
        else{
            res.render('pages/login')
            console.log('---- Displaying login page ----')
        }
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

    if(req.session.loggedin){
        res.render('pages/profile')
        console.log('---- Displaying Profile page ----')
    }
    else{
        res.redirect('/login')
        console.log('---- Not logged in. Redirecting to login page ----')
    }
    
});

//News Page
app.get('/Latest-News', function(req, res){
    res.render('pages/Latest-News')
    console.log('---- Displaying Latest News page ----')
});


app.post('/dologin', function(req, res){

    var username = req.body.username;
    var password = req.body.password;

    //console.log(username)
    //console.log(password)

    db.collection('credentials').findOne({"username":username}, function(err, result){

        if (err) throw err;

        if(!result){
            console.log("---- Invalud Username Entered ----");
            res.redirect('/login');
            return;
        }
        else{

            if (result.password == password){
                req.session.loggedin = true;
                req.session.currentuser = username;
                res.redirect('/profile');
            }
        }
    })
});