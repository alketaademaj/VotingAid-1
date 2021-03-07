import { Link } from "react-router-dom";


const SubmitSelection = ({studentAssociation}) => {
    return(
        <Link
        className="Form-button" 
        to={{
          pathname: "/Form",
          studentAssociation: studentAssociation
        }}
      >
      To Form
      </Link>
    );
}


export default SubmitSelection;