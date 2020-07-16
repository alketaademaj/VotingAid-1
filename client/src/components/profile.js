import React, { Component } from 'react';
import { UserContext } from '../context/userContext';
import { Link } from 'react-router-dom';
import axios from "axios";

  class Profile extends Component {
    static contextType = UserContext;
    constructor(props) {
      super(props);
      this.state = {
        profile: {},
      };
    }


    componentDidMount() {
      var email = this.context.email;
      if(this.props.location.data != null) {
        email = this.props.location.data;
      }

      axios.post('http://localhost:5000/Profile',{data: email})
        .then(res => {
          console.log(res.data);
          this.setState({profile: res.data});
        });
        console.log(this.props.location.data);
   }


    render() {
      return (
        <div>
          <h1>{this.state.profile.name}</h1>
          <h2>{this.state.profile.surname}</h2>
          <h3>{this.state.profile.school}</h3>
          <h4>{this.state.profile.description}</h4>
          <h5>{this.state.profile.campus}</h5>
          <Link
            to={{
              pathname: "/Form",
              data: {
                email: this.state.profile.email,
                school: this.state.profile.school
              }
            }}> Filled Form
          </Link>
        </div>
      );
    }
  }

  export default Profile;
