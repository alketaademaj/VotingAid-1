import React, { Component } from 'react'
import Swal from 'sweetalert2';
import axios from "axios";
import language from "../properties/language";
import { UserContext } from '../context/userContext';

export class addOneCandidate extends Component {
    static contextType = UserContext;
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

    handleChange() {
        this.setState({ studentAssociation: this.refs.campus.value });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        this.setState({ studentAssociation: this.refs.campus.value })
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
                console.log(res.data);
                Swal.fire({
                    text: res.data,
                    icon: res.data.includes('address') ? 'error' : 'success'
                })
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p>{language.oneCandidate[this.context.language]}</p>
                    <label>{language.firstName[this.context.language]}</label>
                    <input type="text" name="name" value={this.state.name} placeholder={''} onChange={this.handleChange}></input>
                    <label>{language.surName[this.context.language]}</label>
                    <input type="text" name="surname" value={this.state.surname} placeholder={''} onChange={this.handleChange}></input>
                    <label>{language.emailPlaceHolder[this.context.language]}: </label>
                    <input type="text" name="email" value={this.state.email} placeholder={''} onChange={this.handleChange}></input>
                    <label>{language.school[this.context.language]}</label>
                    <input type="text" name="school" value={this.state.school} placeholder={''} onChange={this.handleChange}></input>
                    <label htmlFor="campus">{language.selectStudentAssociation[this.context.language]}</label>
                    <select ref="campus" onChange={this.handleChange}>
                        <option value="ASK">ASK</option>
                        <option value="Helga">Helga</option>
                        <option value="HUMAKO">HUMAKO</option>
                        <option value="JAMKO">JAMKO</option>
                        <option value="Laureamko">Laureamko</option>
                        <option value="METKA">METKA</option>
                        <option value="O'Diako">O'Diako</option>
                        <option value="TUO">TUO</option>
                    </select>
                    <label>{language.campus[this.context.language]}</label>
                    <input type="text" name="campus" value={this.state.campus} placeholder={''} onChange={this.handleChange}></input>
                    <label>{language.electoralDistrict[this.context.language]}</label>
                    <input type="text" name="electoralDistrict" value={this.state.electoralDistrict} placeholder={''} onChange={this.handleChange}></input>
                    <label>{language.electoralAlliance[this.context.language]}</label>
                    <input type="text" name="electoralAlliance" value={this.state.electoralAlliance} placeholder={''} onChange={this.handleChange}></input>
                    <label>{language.description[this.context.language]}</label>
                    <input type="text" name="description" value={this.state.description} placeholder={''} onChange={this.handleChange}></input><br></br><br></br>
                    <button type="submit">{language.fillFormButton[this.context.language]}</button>
                </form>
            </div>
        )
    }
}

export default addOneCandidate
