import FormOptionDescription from './formOptionDescription';
import FormOptionContainer from './formOptionContainer';
import QuestionTitle from './questionTitle';

const array = [1,2,3,4,5];
const FormOptionSet = ({counter, questionTitle, isCandidate, action}) => {
   return (
        <div className = {'questionSet' + counter}>
            <QuestionTitle  questionTitle={questionTitle}/>
            {Object.values(array).map(item => {
                return( 
                    <FormOptionContainer counter={counter} action={action} />
                );       
            })}
            <br />
            {isCandidate ? <FormOptionDescription /> : ''}       
        </div>
   );
}


export default FormOptionSet;
