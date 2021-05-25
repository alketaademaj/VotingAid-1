import CandidateTableLinkItem from './candidateTableLinkItem'
import CandidateTableItem from './candidateTableItem'
import axios from "axios";
// import { useHistory } from 'react-router-dom';

const CandidateTableItemRow = ({ text, textOne, textTwo, data, candidateDeleted }) => {
    // let history = useHistory();

    const confirmDelete = (name) => {
        // console.log(name)

        const callback = () => candidateDeleted(data)

        axios
            .post('/deleteCandidate', { n: name })
            .then(callback, callback);
    }

    return (
        <tr id="candidate" >
            <CandidateTableLinkItem textOne={textOne} textTwo={textTwo} pathname={'/Profile'} data={data} />
            <CandidateTableItem text={text} />
            <button onClick={() => confirmDelete(textOne)}>delete</button>
        </tr >
    );
}


export default CandidateTableItemRow;