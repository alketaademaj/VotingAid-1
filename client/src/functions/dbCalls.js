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


const PreFillFormTesting = (email) => {
  
          Axios.post('http://localhost:5000/fillForm', { data: email })
            .then(res => {
              for (var i = 0; i < Object.keys(res.data.filledForm).length / 2; i++) {
                var formInputs = document.getElementsByName(i);
                if (res.data.filledForm['question' + i] == formInputs[0].value) {
                  formInputs[0].checked = true;
                }
                else if (res.data.filledForm['question' + i] == formInputs[1].value) {
                  formInputs[1].checked = true;
                }
                else if (res.data.filledForm['question' + i] == formInputs[2].value) {
                  formInputs[2].checked = true;
                }
                else if (res.data.filledForm['question' + i] == formInputs[3].value) {
                  formInputs[3].checked = true;
                }
                else if (res.data.filledForm['question' + i] == formInputs[4].value) {
                  formInputs[4].checked = true;
                }
                formInputs[5].value = res.data.filledForm['questiondesc' + i];
              }
            });
        
}



export {
    PreFillFormTesting,
    GetQuestions,
};