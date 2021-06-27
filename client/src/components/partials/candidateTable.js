import CandidateTableItemRow from './candidateTableRow'
import CandidateTableHeader from './candidateTableHeader'
import Table from 'react-bootstrap/Table';

const CandidateTable = ({ stateArray, counter, candidateDeleted }) => {
    return (
        <Table striped bordered hover variant="light">
            <thead>
                <tr>
                    <CandidateTableHeader header={'Candidate'} />
                    <CandidateTableHeader header={'Student Association'} />
                    <CandidateTableHeader header={'delete'} />
                </tr>
            </thead>
            <tbody>
                {stateArray.amount.map(index => {
                    counter++;
                    return (
                        <CandidateTableItemRow key={index} id="candidate"
                            candidateDeleted={candidateDeleted}
                            text={stateArray['Candidate' + counter].studentAssociation}
                            textOne={stateArray['Candidate' + counter].name}
                            textTwo={stateArray['Candidate' + counter].surname}
                            data={stateArray['Candidate' + counter].email}
                        />
                    );
                })}
            </tbody>
        </Table>
    );
}

export default CandidateTable;