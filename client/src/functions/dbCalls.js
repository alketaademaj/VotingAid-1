import Axios from 'axios';

const SetCandidateTable = (setStateArray) => {
    Axios.get('http://localhost:5000/')
        .then(res => {
            let q = [];
            let s = [];
            for (var i = 0; i < res.data.length; i++) {
                setStateArray(['Candidate' + i], res.data[i])
                q.push(res.data[i].name);
                setStateArray('amount', q);
                s.push(res.data[i].studentAssociation);

            }
            const uniqueAssociations = Array.from(new Set(s));
            setStateArray('Association', uniqueAssociations);
        });
}

const FilterCandidateTable = (setStateArray, filter) => {
    Axios.post('http://localhost:5000/filteredCandidates', { data: filter })
        .then(res => {
            console.log(res)
            let q = [];
            for (var i = 0; i < res.data.length; i++) {
                setStateArray(['Candidate' + i], res.data[i])
                q.push(res.data[i].name);
                setStateArray('amount', q);
            }
        });
}

export {
    SetCandidateTable,
    FilterCandidateTable,
};