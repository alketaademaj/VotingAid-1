import Axios from 'axios';

const GetQuestions = (filter, setStateArray) => {  
    return Axios.post('http://localhost:5000/questions', { data: filter })
      .then(res => {
        let filteredQuestions = [];
        for (var i = 0; i < res.data.length; i++) {
            filteredQuestions.push(res.data[i]);
        }
        setStateArray(filteredQuestions);
    });
}


const PreFillFormTesting = (email, stateArray) => {
  console.log(email + 'email');
  console.log('statearray');
  console.log(stateArray);
    //console.log(stateArray);
   /*Axios.post('http://localhost:5000/fillForm', { data: email })
    .then(res => {
        for (var i = 0; i < Object.keys(res.data.filledForm).length / 2; i++) {
            console.log(Object.keys(res.data.filledForm).length);
            if (res.data.filledForm['question' + i] == form[0].childNodes[2].childNodes[0].value) {
              form[0].childNodes[2].childNodes[0].checked = true;
            }
            else if (res.data.filledForm['question' + i] == form[0].childNodes[3].childNodes[0].value) {
              form[0].childNodes[3].childNodes[0].checked = true;
            }
            else if (res.data.filledForm['question' + i] == form[0].childNodes[4].childNodes[0].value) {
              form[0].childNodes[4].childNodes[0].checked = true;
            }
            else if (res.data.filledForm['question' + i] == form[0].childNodes[5].childNodes[0].value) {
              form[0].childNodes[5].childNodes[0].checked = true;
            }
            else if (res.data.filledForm['question' + i] == form[0].childNodes[6].childNodes[0].value) {
              form[0].childNodes[6].childNodes[0].checked = true;
            }
            form[0].childNodes[5+i].value = res.data.filledForm['questiondesc' + i];
          }
    });*/
}


export {
    PreFillFormTesting,
    GetQuestions,
};