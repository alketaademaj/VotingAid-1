import React, { Component } from 'react';
import { UserContext } from '../context/userContext';
import { Link } from 'react-router-dom';
import axios from "axios";
import Picture from './partials/picture';
import FileUpload from './FileUpload';

class Profile extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      filename: null,
      pics: [],
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData = async () => {
    var email = this.context.email;
    // if (this.props.location.data != null) {
    //   email = this.props.location.data;
    // }
    await axios.post('http://localhost:5000/Profile', { email: email })
      .then(res => {
        console.log(res.data)
        this.setState({ profile: res.data });
      }).catch(err => {
        console.log(err)
      });
  }

  updatePicture = (data) => {
    this.setState(state => ({
      ...state,
      profile: {
        ...state.profile,
        image: data.filePath
      }
    }))
  }

  componentDidMount() {
    this.fetchData();
  }

  //---------------------------------------------------------------------------------------------
  render() {
    const { profile } = this.state
    if (!profile) {
      return null
    }

    return (
      <div>
        <div className="candidate">
          <h1>{this.state.profile.name} {this.state.profile.surname}</h1>
          <h3>{this.state.profile.school}</h3>
          <h4>{this.state.profile.studentAssociation}</h4>
          <h5>{this.state.profile.description}</h5>
          <h6>{this.state.profile.campus}</h6>
        </div>
        {profile.image && <Picture className="pic" source={process.env.PUBLIC_URL + profile.image}></Picture>}
        <br />
        <Link
          to={{
            pathname: "/Form",
            data: {
              email: profile.email,
              studentAssociation: profile.studentAssociation,
            }
          }}> {profile.name + "'s Form"}
        </Link>
        < br />
        <FileUpload email={profile.email} onUpload={this.updatePicture}></FileUpload>
      </div >
    );
  }
}

export default Profile;
