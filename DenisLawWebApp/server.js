//loading external applications to run the server
const express = require('express');
const session = require('express-session');
const app = express();

//mongodb initialisation
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
var DLLT_db

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
MongoClient.connect(url, function(err, client){
    
    if(err) throw err;
    DLLT_db = client.db('DLLT_Users')
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

    var email = req.body.email;
    var password = req.body.password;

    //console.log(username)
    //console.log(email)

    DLLT_db.collection('credentials').findOne({"email":email}, function(err, result){

        if (err) throw err;

        if(!result){
            console.warn("---- Invalid email entered ----");
            res.redirect('/login');
            return;
        }
        else{

            if (result.password == password){
                req.session.loggedin = true;
                req.session.currentuser = email;
                res.redirect('/profile');
            }
            else{
                console.warn("---- Invalid Password Entered ----")
                res.redirect('/login')
            }
        }
    })
});

app.post('/adduser', function(req, res){

    var userRegInfo = {
        "name":req.body.first + " " + req.body.last,
        "email":req.body.email,
        "password":req.body.password,
        "postcode":req.body.postcode,
        "dob":req.body.dob,
        "contactNo":req.body.contact
    }

    //console.log(name + ", " + email + ", " + password + ", " + postcode + ", " + dob + ", " + contactNo)
    
    DLLT_db.collection('credentials').findOne({"email":userRegInfo.email}, function( err, result){

        if (err) throw err;

        if (result){
            console.log("---- Cannot register user. Email already in use ----")
            res.redirect("/register")
        }
        else{

            DLLT_db.collection('credentials').insert(userRegInfo, function(err, result){

                if (err) throw err;

                console.log("---- New user saved to database ----")
                res.redirect("/login")
            })
        }
    })
})

app.post('/deleteuser', function(req, res){

    DLLT_db.collection('credentials').deleteOne({"email":req.session.currentuser}, function(err, result){

        if (err) throw err;

        if (result){
            console.log("---- User successfully deleted ----")
            req.session.loggedin = false;
            req.session.destroy();
            res.redirect('/login')
        }
        else{
            console.log(' ---- Error deleting user. Try again ----')
        }
    })
})

app.post('/editpassword', function(req, res){

    DLLT_db.collection('credentials').updateOne({email:req.session.currentuser},{$set:{"password" : req.body.password}})
    {
            console.log("---- Updated user password ----")
            res.redirect('/profile')
        }
    })

app.post('/editpostcode', function(req, res){

    DLLT_db.collection('credentials').updateOne({email:req.session.currentuser},{$set:{"postcode" : req.body.postcode}})
    {
            console.log("---- Updated user post code ----")
            res.redirect('/profile')
        }
    })

app.post('/editdob', function(req, res){

    DLLT_db.collection('credentials').updateOne({email:req.session.currentuser},{$set:{"dob" : req.body.dob}})
    {
            console.log("---- Updated user date of birth ----")
            res.redirect('/profile')
        }
    })

app.post('/editcontactno', function(req, res){

    DLLT_db.collection('credentials').updateOne({email:req.session.currentuser},{$set:{"contactNo" : req.body.contactnumber}})
    {
            console.log("---- Updated user emergency contact number ----")
            res.redirect('/profile')
        }
    })

app.post('/retrieveuserinfo', function(req, res){

    DLLT_db.collection('credentials').findOne({"email":req.session.currentuser}), function(err, result){

        if (err) throw err;

        res.send(result.toArray())
    }
})    