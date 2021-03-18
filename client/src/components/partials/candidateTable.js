import CandidateTableItemRow from './candidateTableRow'
import CandidateTableHeader from './candidateTableHeader'
import Table from 'react-bootstrap/Table';

const CandidateTable = ({stateArray,counter}) => {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
          <tr>
            <CandidateTableHeader header={'Candidate'} />
            <CandidateTableHeader header={'Student Association'} />
          </tr>
      </thead>
        <tbody>
          {stateArray.amount.map(index => {
            counter++;
              return (
                <CandidateTableItemRow 
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