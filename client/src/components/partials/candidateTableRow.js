import CandidateTableLinkItem from './candidateTableLinkItem'
import CandidateTableItem from './candidateTableItem'
import axios from "axios";
// import language from "../component/properties/language";
// import { UserContext } from './context/userContext';
// import { useHistory } from 'react-router-dom';


const CandidateTableItemRow = ({ text, textOne, textTwo, data, candidateDeleted, button }) => {
    // let history = useHistory();

    const confirmDelete = (email) => {
        // console.log(data)

        const callback = () => candidateDeleted(data)

        axios
            .post('/deleteCandidate', { deleteCandidateByEmail: email })
            .then(callback, callback);
    }

    return (
        <tr id="candidate" >
            <CandidateTableLinkItem textOne={textOne} textTwo={textTwo} pathname={'/Profile'} data={data} />
            <CandidateTableItem text={text} />
            <button onClick={() => confirmDelete(data)}>Delete</button>
        </tr >
    );
}


export default CandidateTableItemRow;