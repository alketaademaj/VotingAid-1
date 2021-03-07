import FormOption from './formOption';


const FormOptionContainer = ({counter, action, value}) => {
    return (
        <label class="container">
            <FormOption 
                className={'questionOption'} 
                counter={counter} 
                action={action} 
                isActive={true}
                value={value}
            />
            <span class="checkmark"></span>
        </label>
    );
}

export default FormOptionContainer;