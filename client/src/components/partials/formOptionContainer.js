import FormOption from './formOption';


const FormOptionContainer = ({counter, action}) => {
    return (
        <label class="container">
            <FormOption 
                className={'questionOption'} 
                counter={counter} 
                action={action} 
                isActive={true}
            />
            <span class="checkmark"></span>
        </label>
    );
}

export default FormOptionContainer;