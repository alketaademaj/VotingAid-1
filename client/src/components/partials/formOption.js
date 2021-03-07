const FormOption = ({className, counter, value, action}) => {
    return <input 
        className={className} 
        type="radio" 
        value={value} 
        name={counter} 
        onChange={action} 
    />
}


export default FormOption;