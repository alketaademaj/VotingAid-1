const FormOptionDescription = ({className, counter, value, action, isActive}) => {
    return <input 
        name={counter}
        placeholder={"Explain your choice"} 
        style={{ marginBottom: "41px", width: "100%" }} 
        onChange={action} 
    />
}

export default FormOptionDescription;





