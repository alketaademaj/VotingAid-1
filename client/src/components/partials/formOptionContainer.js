import FormOption from './formOption';
import React from 'react';




const FormOptionContainer = ({className, counter, action, isActive, value}) => {
    return (
        <label className="container">
            <FormOption 
                className={'questionOption'} 
                counter={counter}
                action={action} 
                isActive={true}
                value={value}
            />
            <span className="checkmark"></span>
        </label>
    );
}


export default FormOptionContainer;