import React, { Component } from 'react'
import Swal from 'sweetalert2';
import axios from "axios";

export class addOneCandidate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            surname: '',
            email: '',
            school: '',
            studentAssociation: '',
            campus: '',
            electoralDistrict: '',
            electoralAlliance: '',
            description: '',
        };
    }

    addCandidate = () => {
        Swal.fire({
            title: 'You have succesfully added one candidate!',
            icon: "success",
            confirmButtonText: "Confirm",
        })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        // console.log(event.target.name + '    ' + event.target.value)
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const oneCandidate = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            school: this.state.school,
            studentAssociation: this.state.studentAssociation,
            campus: this.state.campus,
            electoralDistrict: this.state.electoralDistrict,
            electoralAlliance: this.state.electoralAlliance,
            description: this.state.description,
        }
        axios.post('http://localhost:5000/addOneCandidate', oneCandidate)
            .then(res => {
                console.log(res);
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p>Fill in the information below to add one candidate</p>
                    <label>First name: </label>
                    <input type="text" name="name" value={this.state.name} placeholder={''} onChange={this.handleChange}></input>
                    <label>Surname: </label>
                    <input type="text" name="surname" value={this.state.surname} placeholder={''} onChange={this.handleChange}></input>
                    <label>Email: </label>
                    <input type="text" name="email" value={this.state.email} placeholder={''} onChange={this.handleChange}></input>
                    <label>School: </label>
                    <input type="text" name="school" value={this.state.school} placeholder={''} onChange={this.handleChange}></input>
                    <label>Student Association: </label>
                    <input type="text" name="studentAssociation" value={this.state.studentAssociation} placeholder={''} onChange={this.handleChange}></input>
                    <label>Campus: </label>
                    <input type="text" name="campus" value={this.state.campus} placeholder={''} onChange={this.handleChange}></input>
                    <label>Electoral District: </label>
                    <input type="text" name="electoralDistrict" value={this.state.electoralDistrict} placeholder={''} onChange={this.handleChange}></input>
                    <label>Electoral Alliance: </label>
                    <input type="text" name="electoralAlliance" value={this.state.electoralAlliance} placeholder={''} onChange={this.handleChange}></input>
                    <label>Description: </label>
                    <input type="text" name="description" value={this.state.description} placeholder={''} onChange={this.handleChange}></input><br></br><br></br>
                    <button type="submit" onClick={this.addCandidate}>Submit!</button>
                </form>
            </div>
        )
    }
}

export default addOneCandidate
