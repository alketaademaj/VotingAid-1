import React, { Component } from 'react';
import { UserContext } from '../context/userContext';
import { Link } from 'react-router-dom';
import axios from "axios";
import Picture from './partials/picture';
//import ChangePic from './changePic';
import FileUpload from './FileUpload';


class Profile extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      filename: null,
      pics: [],
    };
  }

  componentDidMount() {
    var email = this.context.email;
    if (this.props.location.data != null) {
      email = this.props.location.data;
    }
    axios.post('http://localhost:5000/Profile', { data: email })
      .then(res => {
        this.setState({ profile: res.data });
      });
  }
  //---------------------------------------------------------------------------------------------
  render() {
    return (
      <div>
        <h1>{this.state.profile.name}</h1>
        <h2>{this.state.profile.surname}</h2>
        <h3>{this.state.profile.school}</h3>
        <h4>{this.state.profile.studentAssociation}</h4>
        <h5>{this.state.profile.description}</h5>
        <h6>{this.state.profile.campus}</h6>
        <Picture source={process.env.PUBLIC_URL + this.state.profile.image}></Picture>
        <FileUpload></FileUpload>
        <Link
          to={{
            pathname: "/Form",
            data: {
              email: this.state.profile.email,
              studentAssociation: this.state.profile.studentAssociation,
            }
          }}> {this.state.profile.name + "'s Form"}
        </Link>
      </div >
    );
  }
}

export default Profile;
