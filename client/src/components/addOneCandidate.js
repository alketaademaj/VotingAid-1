import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class addOneCandidate extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <form>
                    <p>Fill in the information below to add one candidate</p>
                    {/* <label>First name: </label> */}
                    <input type="question" name="question" placeholder="First Name"></input>
                    {/* <label>Surname: </label> */}
                    <input type="question" name="question" placeholder="Surname"></input>
                    {/* <label>Email: </label> */}
                    <input type="question" name="question" placeholder="Email"></input>
                    {/* <label>School: </label> */}
                    <input type="question" name="question" placeholder="School"></input>
                    {/* <label>Student Association: </label> */}
                    <input type="question" name="question" placeholder="Student Association"></input>
                    {/* <label>Campus: </label> */}
                    <input type="question" name="question" placeholder="Campus"></input>
                    {/* <label>Electoral District: </label> */}
                    <input type="question" name="question" placeholder="Electoral District"></input>
                    {/* <label>Electoral Alliance: </label> */}
                    <input type="question" name="question" placeholder="Electoral Alliance"></input>
                    {/* <label>Description: </label> */}
                    <input type="question" name="question" placeholder="Description"></input><br></br><br></br>
                    <button>Submit!</button>
                </form>
            </div>
        )
    }
}

export default addOneCandidate
