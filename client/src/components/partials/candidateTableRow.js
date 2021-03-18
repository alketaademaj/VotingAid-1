import CandidateTableLinkItem from './candidateTableLinkItem'
import CandidateTableItem from './candidateTableItem'

const CandidateTableItemRow = ({text, textOne, textTwo,data}) =>  {
    return (
        <tr>
            <CandidateTableLinkItem textOne={textOne} textTwo={textTwo} pathname={'/Profile'} data={data} />
            <CandidateTableItem text={text} />
        </tr>
    );
}

export default CandidateTableItemRow;