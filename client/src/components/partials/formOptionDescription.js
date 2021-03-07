const FormOptionDescription = ({className, counter, value, action, isActive}) => {
    return <input 
        type="text" 
        name={counter}
        placeholder="Explain your choice" 
        style={{ marginBottom: "41px", width: "75%" }} 
        onChange={action} 
    />
}

export default FormOptionDescription;





