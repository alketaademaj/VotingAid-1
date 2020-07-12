import React, { Component } from 'react';
import { UserContext } from '../context/userContext';
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
      axios.post('http://localhost:5000/Profile',{data: this.context.email})
        .then(res => {
          console.log(res.data);
          this.setState({profile: res.data});
        });

   }


    render() {
      return (
        <div>
          <h1>{this.state.profile.name}</h1>
          <h2>{this.state.profile.surname}</h2>
          <h3>{this.state.profile.school}</h3>
          <h4>{this.state.profile.description}</h4>
          <h5>{this.state.profile.campus}</h5>
        </div>
      );
    }
  }

  export default Profile;
