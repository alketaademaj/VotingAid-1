import React from 'react';
import axios from 'axios';

function Query() {
  axios.get('http://localhost:5000/questions')
    .then(res => {
      let lol = res.data[0].question
      console.log(lol);
  });
}

function Questions() {
  var questions = ["testi","kysymys"]
  var counter = -1;
  return (
    <form action ="/validate">
    {questions.map(index => {
      counter++;
      return (
        <div className="radio">
            <label></label>
            <div><sub className="disa">Disagree</sub><sub className="agg">Agree</sub></div>
            <input type="radio" value="option1" name = {counter} />
            <input type="radio" value="option2" name = {counter} />
            <input type="radio" value="option3" name = {counter} />
            <input type="radio" value="option4" name = {counter} />
            <input type="radio" value="option5" name = {counter} />
        </div>
      );
    })}
    </form>
  );
}

function Form() {
  return (
    <Questions />
  );
}

export default Form;


//KAIKKI KYSYMYKSET TAULUKKOON, JA TAULUKON PITUUDEN MUKAAN TARVITTAVA MÄÄRÄ
//FORMI ELEMENTTEJÄ, JOISSA <LABEL> = ARRAY[I]

//if(session.state = 'Candidate') {
//  send all formquestion Name and Value to Vaalikonekysymykset Where Candidate.name == session.name;
//}

//if(session != NULL) {
//  show form where filler == candidate[0].name
//}
