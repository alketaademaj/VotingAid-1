const express = require('express');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('client-sessions');

const saltRounds = 10;
const mongoose = require('mongoose');
var uri = "mongodb+srv://AdminAlketa:PuuPalikka7750@cluster0-6p6dl.mongodb.net/ElectionCandidates?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

require("./models/candidate");
require("./models/question");
require("./models/user");



var Candidate  = mongoose.model('candidate');
var Question  = mongoose.model('question');
var User = mongoose.model('user');


const app = express();


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client')));
app.use(cors());
app.use(session({
  cookieName: 'session',
  secret: 'LRPgrd59zlZUDyjsXJDA',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));


//module for handling form data
var bp = require('body-parser')
app.use( bp.json() );       // to support JSON-encoded bodies
app.use(bp.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.get('/', (req,res) => { //Shows all the candidates
  Candidate.find({}, function(err, results) {
    res.send(results);
  });
});

app.post('/Profile', (req,res) => {
  const email = req.body.data;
  Candidate.findOne({email: email}, function(err, results) {
    console.log(results);
    res.send(results);
  });
});

app.get('/questions', (req,res) => { //Returns all the questions from database
  Question.find({}, function(err, results) {
    res.send(results);
  });
});

app.post('/registration', (req,res) => {

  const pass = req.body.password;

  bcrypt.hash(pass, saltRounds, function(err, hash) {

    var user = new User ({
      email: req.body.email,
      password: hash,
      status: "Candidate",
    });

    User.countDocuments({email: req.body.email},function(err, count) {
      if (count == 0) {
          user.save(function(err, user) {
        if (err) return console.log(err);
            console.log("Succesfully added user to database!");
        });
      }
      else {
        console.log("Email with this address already exists as a user!");
      }
    });
  });
});


app.post('/login',(req,res) => {

  var email = req.body.email;
  var pass = req.body.password;

  User.findOne({email: email}, function(err,user) {
    if (!user) {
      res.send("User does not exist");
    }
    if(user) {
      bcrypt.compare(pass, user.password).then(function(result) {
          if(result) {
            req.session.user = user;
            console.log("Logged in");
            console.log(req.session.user);
            res.send(user);
          }
          else {
            res.send("Invalid Password");
          }
      });
    }

  });
});

app.get('/test',(req,res) => {
    if(req.session.user) {
      res.send("user logged in");
    }
    else{
      res.send("You're not Logged in");
    }
});

app.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});

app.post('/send', function(req, res) {
  console.log(req.body[0]);

  for (var i = 0; i < req.body.length; i++) {
    var nestedVar = 'filledForm.question'+i;
    console.log(nestedVar);
    Candidate.findOneAndUpdate({email: '1500@laurea.fi'}, {$set: {[nestedVar]: req.body[i]}}, { useFindAndModify: false }, function(err, doc) {
      console.log(doc);
    });
  }
});

// Handles any requests that don't match the ones above
//app.get('*', (req,res) =>{
//    res.sendFile(path.join(__dirname+'/client/build/index.html'));
//});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
