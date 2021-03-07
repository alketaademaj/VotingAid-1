import FormOptionDescription from './formOptionDescription';
import FormOptionContainer from './formOptionContainer';
import QuestionTitle from './questionTitle';

const array = [-2,-1,0,1,2];
const FormOptionSet = ({counter, questionTitle, isCandidate, action}) => {
   return (
        <div className = {'questionSet' + counter}>
            <QuestionTitle  questionTitle={questionTitle}/>
            {Object.values(array).map(item => {
                return( 
                    <FormOptionContainer counter={counter} action={action} value={item} />
                );       
            })}
            <br />
            {isCandidate ? <FormOptionDescription /> : ''}       
        </div>
   );
}


export default FormOptionSet;
