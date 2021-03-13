import FormOptionDescription from './formOptionDescription';
import FormOptionContainer from './formOptionContainer';
import { UserContext } from "../../context/userContext";
import { useContext } from 'react';
import TitleLabel from './titleLabel';

const array = [-2,-1,0,1,2];

const FormOptionSet = ({counter, questionTitle, isCandidate, action}) => {
    const user = useContext(UserContext);
   return (
        <div className = {'questionSet' + counter}>
            <TitleLabel  questionTitle={questionTitle}/>
            {Object.values(array).map(item => {
                return(
                    <FormOptionContainer counter={counter} action={action} value={item} />                              
                );       
            })}
            <br />
            {user.loggedIn ? <FormOptionDescription counter={counter} /> : ''}       
        </div>
   );
}


export default FormOptionSet;
