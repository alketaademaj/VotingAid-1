import React, { Component } from 'react';
import { UserContext } from '../context/userContext';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { Link } from 'react-router-dom';
import Profile from './profile.js';

class Candidates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '$select',
      candidates: [],
      associations: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/')
      .then(res => {
        const uniqueAssociations = Array.from(new Set(
          res.data
            .map(candidate => candidate.studentAssociation)
            .filter(x => x)
        ))

        this.setState({
          candidates: res.data,
          associations: uniqueAssociations
        })
      });
  }

  handleChange = (e) => {
    const association = e.target.value
    this.setState(state => ({
      filter: association,
      filteredCandidates:
        association === '$select'
          ? null
          : state.candidates.filter(c => c.studentAssociation === association)
    }))
    // axios.post('http://localhost:5000/filteredCandidates', { data: this.refs.school.value })
    //   .then(res => {
    //     this.setState({ candidates: res.data })
    //   });
  }

  clearFilter = () => {
    this.setState({
      filter: '$select',
      filteredCandidates: null
    })
  }

  render() {
    const candidates = this.state.filteredCandidates || this.state.candidates
    return (
      <div style={{ width: '50%', marginLeft: '25%', marginTop: '5%' }}>
        <label htmlFor="school">Filter by School</label>
        <select ref="school" value={this.state.filter} onChange={this.handleChange}>
          <option value='$select'>Select one...</option>
          {this.state.associations.map((association, i) => {
            return (
              <option key={i} value={association}>{association}</option>
            );
          }
          )}
        </select>
        <button onClick={this.clearFilter} disabled={!this.state.filteredCandidates}>Clear filter</button>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Candidate</th>
              <th>Student Association</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td style={{ cursor: "pointer" }}>
                    <Link
                      to={{
                        pathname: "/Profile",
                        data: candidate.email
                      }}> {candidate.name + ' ' + candidate.surname}
                    </Link>
                  </td>
                  <td>{candidate.studentAssociation}</td>
                </tr>
              );
            }
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default Candidates;
