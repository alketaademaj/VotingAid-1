import CandidateTableLinkItem from './candidateTableLinkItem'
import CandidateTableItem from './candidateTableItem'
import axios from "axios";
// import { useHistory } from 'react-router-dom';

const CandidateTableItemRow = ({ text, textOne, textTwo, data, candidateDeleted }) => {
    // let history = useHistory();

    const confirmDelete = (email) => {
        console.log(data)

        const callback = () => candidateDeleted(data)

        axios
            .post('/deleteCandidate', { deleteCandidateByEmail: email })
            .then(callback, callback);
    }

    return (
        <tr id="candidate" >
            <CandidateTableLinkItem textOne={textOne} textTwo={textTwo} pathname={'/Profile'} data={data} />
            <CandidateTableItem text={text} />
            <button onClick={() => confirmDelete(data)}>delete</button>
        </tr >
    );
}


export default CandidateTableItemRow;