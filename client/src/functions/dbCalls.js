import Axios from 'axios';
import Swal from 'sweetalert2'
import UserContext from '../context/userContext';
import {useContext} from 'react';


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


const PreFillForm = (email) => {
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

const HandleLogin = ({userObject, changeUser}) => {
 /* Axios.post('http://localhost:5000/login',  userObject)
    .then(res => {
      if (res) {
        changeUser(res.data.status,res.data.email,true);
        if(!this.context.user || !this.context.email) {  // TODO: COME UP WITH SOMETHING BETTER MAYBE
          changeUser('Quest','',false);
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Invalid Username Or Password',
          })
        } else {
            Swal.fire({
              title: "You've Succesfully Logged In",
              text: "You may now enter",
              icon: "success",
              confirmButtonText: "Confirm",
            });
            sessionStorage.setItem('email',this.context.email);
            sessionStorage.setItem('status',this.context.user);
            this.props.history.push({
              pathname: '/',
            })
        }
      }
    });*/
}



export {
    PreFillForm,
    GetQuestions,
    HandleLogin,
};