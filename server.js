const express = require('express');
const fs = require('fs')
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('client-sessions');
const async = require('async');

const saltRounds = 10;
const mongoose = require('mongoose');
var uri = "mongodb+srv://AdminAlketa:PuuPalikka7750@cluster0-6p6dl.mongodb.net/ElectionCandidates?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

require("./models/candidate");
require("./models/question");
require("./models/user");

var Candidate = mongoose.model('candidate');
var Question = mongoose.model('question');
var User = mongoose.model('user');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client')));
app.use(fileUpload());
app.use(cors());
app.use(session({
  cookieName: 'session',
  secret: 'LRPgrd59zlZUDyjsXJDA',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

//module for handling form data
var bp = require('body-parser');
const { default: Axios } = require('axios');
app.use(bp.json());       // to support JSON-encoded bodies
app.use(bp.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', (req, res) => { //Shows all the candidates
  Candidate.find({}, function (err, results) {
    res.send(results);
  });
});

app.post('/forms', (req, res) => { //Shows all the forms
  var filter = req.body.data;
  console.log('||' + filter + '||');
  Candidate.find({ school: { $eq: filter } }, function (err, results) {
    res.send(results);
  });
});

app.post('/suggested', (req, res) => { //Shows all the suggested candidates
  var userAnswer = req.body.data.answers;
  var filter = req.body.data.studentAssociation;
  console.log(req.body)
  Candidate.find({ studentAssociation: { $eq: filter } }, function (err, results) {
    var filteredResult = [];
    //console.log(results[0])
    //console.log(Object.keys(results[0].filledForm).length / 2); // KANDIDAATIN VASTATUN FORMIN PITUUS
    //console.log(results.length); // KANDIDAATTEN MÄÄRÄ TIETYSSÄ KOULUSSA
    //res.send(results);

    var finalResults = [];

    for (var i = 0; i < results.length; i++) {
      var similarity = 1;
      var danger = 1;
      var candidateArray = [];

      for (var j = 0; j < Object.keys(results[i].filledForm).length / 2; j++) {

        if (userAnswer[j] === results[i].filledForm['question' + j]) { //Check for similarity
          similarity += 1;
        }

        candidateArray.push(results[i].filledForm['question' + j]); //Creating an array from filledForm integers

        if ((userAnswer[j] == 2 && results[i].filledForm['question' + j] == -2) || (userAnswer[j] == -2 && results[i].filledForm['question' + j] == 2)) {
          danger += 1; //Check for opposite answer
        }

        let userSum = userAnswer.reduce((result, number) => result + number);
        let candSum = candidateArray.reduce((result, number) => result + number);

        if ((userSum >= (candSum * 0.50) || danger <= 0.25 * userAnswer.length) && similarity >= (0.30 * userAnswer.length)) {
          finalResults.push(results[i]);
        }

      }
    }
    let unique = [...new Set(finalResults)];
    console.log(unique);
    res.send(unique);
  });
});

app.post('/filteredCandidates', (req, res) => { //Shows filtered andidates
  const filter = req.body.data;
  Candidate.find({ studentAssociation: filter }, function (err, results) {
    res.send(results);
  });
});

app.post('/Profile', (req, res) => {
  const email = req.body.email;
  Candidate.findOne({ email: email }, function (err, results) {
    console.log(email)
    if (err) {
      return res.status(500).send();
    }

    if (!results) {
      return res.status(404).send();
    }

    res.send(results);
  });
});

app.post('/questions', (req, res) => { //Form question and parse call
  const area = req.body.data;
  Question.find({ area: { $in: [area, 'Undefined'] } }, function (err, results) {
    res.send(results);
  });
});

app.get('/allQuestions', (req, res) => { //Shows all the questions
  Question.find({}, function (err, results) {
    res.send(results);
  });
});

app.post('/submitQhuahoo', function (req, res) { //EDIT ONE EXISTING submitQhuahoo
  var defaultData = req.body.data.default;
  var changedData = req.body.data.changed;
  Question.findOneAndUpdate({ question: defaultData }, { $set: { question: changedData } }, { useFindAndModify: false }, function (err, doc) {
    console.log(doc);
  });

});

app.post('/deleteQhuahoo', function (req, res) { //DELETE ONE EXISTING Qhuahoo
  var deletedQuestion = req.body.deletion;
  Question.deleteOne({ question: deletedQuestion }, function (err, doc) {
    console.log(doc);
  });

});

//------------------------------------------------
app.post('/fillForm', (req, res) => {
  var email = req.body.data;
  Candidate.findOne({ email: email }, function (err, results) {
    // console.log(results.filledForm);
    res.send(results);
  });
});
//----------------------------------------

app.post('/registration', (req, res) => {

  const pass = req.body.password;

  bcrypt.hash(pass, saltRounds, function (err, hash) {

    var user = new User({
      email: req.body.email,
      password: hash,
      status: "Candidate",
    });
    Candidate.countDocuments({ email: req.body.email }, function (err, count) {
      if (count != 0) {
        User.countDocuments({ email: req.body.email }, function (err, count) {
          if (count == 0) {
            user.save(function (err, user) {
              if (err) return console.log(err);
              res.send("Succesfully added user to database!");
            });
          }
          else {
            res.send("Email with this address already exists as a user!");
          }
        });
      } else {
        res.send('You cannot register an account for email address that does not exist as a candidate!');
      }
    })
  });
});

app.post('/login', (req, res) => {

  var email = req.body.email;
  var pass = req.body.password;

  User.findOne({ email: email }, function (err, user) {
    if (!user) {
      res.send("User does not exist");
    }
    if (user) {
      bcrypt.compare(pass, user.password).then(function (result) {
        if (result) {
          req.session.user = user;
          console.log("Logged in");
          console.log(req.session.user);
          res.send(user);
        }
        else {
          res.send("Invalid login");
        }
      });
    }

  });
});

app.get('/test', (req, res) => {
  if (req.session.user) {
    res.send("user logged in");
  }
  else {
    res.send("You're not Logged in");
  }
});

app.get('/logout', function (req, res) {
  req.session.reset();
  res.redirect('/');
});

app.post('/send', function (req, res) {
  var length = req.body.ans.length + req.body.desc.length;
  var email = req.body.email;
  console.log(email);
  for (var i = 0; i < req.body.ans.length; i++) {
    var nestedOpt = 'filledForm.question' + i;
    var nestedDesc = 'filledForm.questiondesc' + i;
    Candidate.findOneAndUpdate({ email: email }, { $set: { [nestedOpt]: req.body.ans[i], [nestedDesc]: req.body.desc[i] } }, { useFindAndModify: false }, function (err, doc) {
      console.log(doc);
    });
  }
});

app.post('/addCandidates', (req, res) => {
  for (var i = 0; i < req.body.candidate.length - 1; i++) {
    var data = req.body.candidate[i].data;
    addOneCandidate(data);
  }
});

app.post('/addQuestion', (req, res) => {
  console.log(req.body.question);

  var question = new Question({
    question: req.body.question,
    area: req.body.area,
  });

  Question.countDocuments({ question: req.body.question }, function (err, count) {
    if (count == 0) {
      question.save(function (err, user) {
        if (err) return console.log(err);
        console.log("Succesfully added question to database!");
      });
    }
    else {
      console.log("question already exists!");
    }
  });
});

// Handles any requests that don't match the ones above
//app.get('*', (req,res) =>{
//    res.sendFile(path.join(__dirname+'/client/build/index.html'));
//});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

//Functions --------------------------------------------------------------------

async function addOneCandidate(data) {
  var candidate = new Candidate({
    name: data.name,
    surname: data.surname,
    email: data.email,
    school: data.school,
    studentAssociation: data.studentAssociation,
    campus: data.campus,
    electoralDistrict: data.electoralDistrict,
    electoralAlliance: data.electoralAlliance,
    description: data.description,
    picture: data.picture,
    image: '/auto.png',
    filledForm: {
      question0: '',
      questiondesc0: '',
    },
  });

  console.log(candidate);
  Candidate.countDocuments({ email: data.email }, function (err, count) {
    if (count == 0) {
      candidate.save(function (err, user) {
        if (err) return console.log(err);
        console.log("Succesfully added candidate to database!");
      });
    }
    else {
      console.log("Email with this address already exists as a candidate!");
    }
  });
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.get('/randomFill', function (req, res) {
  var taulukko = [-2, -1, 0, 1, 2];
  Candidate.find({}, function (err, allCandidate) {
    allCandidate.forEach((oneCandidate) => {
      var id = oneCandidate._id;
      var data = oneCandidate.studentAssociation;
      Question.find({
        $or: [
          { 'area': data },
          { 'area': "Undefined" }
        ]
      }, function (err, cookie) {
        for (var i = 0; i < cookie.length; i++) {
          var rndnumero = taulukko[Math.floor(Math.random() * taulukko.length)];
          var nestedOpt = 'filledForm.question' + i;
          var nestedDesc = 'filledForm.questiondesc' + i;
          Candidate.findOneAndUpdate({ _id: id }, { $set: { [nestedOpt]: rndnumero, [nestedDesc]: "" } }, { useFindAndModify: false }, function (err, doc) {
          });
        }
      });
    })
  });
  res.send("The answers were updated!")
  console.log('ok');
});
//-----------------------------------------------------------------------
//ADDING THE PICTURE 
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
    // file.mv(`${__dirname}/client/public/uploads/194938.png`
  }
  const file = req.files.file;
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    const email = req.body.email;

    const candidate = await Candidate.findOne({ email: email });
    if (candidate.image !== '/auto.png') {
      fs.unlink(`${__dirname}/client/public/${candidate.image}`, (err) => {
        if (err) {
          console.error(err)
        }
      })
    }

    await editOneCandidate("/uploads/" + file.name, "image", email);
    //res.send(image)
    res.status(200).send();
  });
});

async function editOneCandidate(data, variable, email) {
  console.log(email)
  return await Candidate.findOneAndUpdate({ email: email }, { $set: { [variable]: data } }, { useFindAndModify: false })
}

//----------alustaa kaikki kuvat
app.get('/initPictures', function (req, res) {
  Candidate.find({}, function (err, allCandidate) {
    allCandidate.forEach((oneCandidate) => {
      let id = oneCandidate._id;
      Question.find({
      }, function (err, cookie) {
        for (var i = 0; i < cookie.length; i++) {
          Candidate.findOneAndUpdate({ _id: id }, { $set: { image: '/auto.png' } }, { useFindAndModify: false }, function (err, doc) {
          });
        }
      });
    })
  });
  res.send("The pictures were updated!")
});

//------------------------- delete candidate
app.post('/deleteCandidate', function (req, res) { //DELETE ONE EXISTING candidate
  var deleteCandidate = req.body.n;
  Candidate.deleteOne({ name: deleteCandidate }, function (err, doc) {
  });
});


