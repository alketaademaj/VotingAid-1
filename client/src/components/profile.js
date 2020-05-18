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
      return <h1>{this.state.profile.name}</h1>;
    }
  }

  export default Profile;
