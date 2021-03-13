const SingleInputField = ({type, name, placeholder, value, action, mandatory}) => {
   return <input type={type} name={name} placeholder={placeholder} value={value} onChange={action} required={mandatory}/>
}
export default SingleInputField;