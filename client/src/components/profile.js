import React, { Component } from 'react';
import { UserContext } from '../context/userContext';
import { Link } from 'react-router-dom';
import axios from "axios";
import Picture from './partials/picture';
import FileUpload from './FileUpload';
import SingleInputField from "./partials/singleInputField";
import language from '../properties/language';

class Profile extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      filename: null,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData = async () => {
    var email = this.context.email;
    if (this.props.location.data != null) {
      email = this.props.location.data;
    }
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

  submitData = async () => {
      await axios.post('http://localhost:5000/editInformation', { data: this.state.profile })
          .then(res => {
              console.log(res.data)
              this.setState({ profile: res.data });
          }).catch(err => {
              console.log(err)
          });
  }
  onChange = (e) => {
      let target = e.target
      this.setState(prevState => {
          let profile = { ...prevState.profile };
          profile[target.id] = target.value;
          return { profile };
      });
  }
  //---------------------------------------------------------------------------------------------
  render() {
      const {profile} = this.state
      if (!profile) {
          return null
      }
      let information = [
          {value: profile.name, id: 'name'},
          {value: profile.surname, id: 'surname'},
          {value: profile.school, id: 'school'},
          {value: profile.studentAssociation, id: 'studentAssociation'},
          {value: profile.description, id: 'description'},
          {value: profile.campus, id: 'campus'},
      ];

    return (
      <div>
        <div className="candidate">
            {information.map((info) => (
                <input id={info.id} defaultValue={info.value} onChange={this.onChange}/>
            ))}

            {/*<SingleInputField action={this.handler} id={'name'} defaultValue={this.state.profile.name}/> <br/>
            <SingleInputField action={this.handler} id={'surname'} defaultValue={this.state.profile.surname}/> <br/>
            <SingleInputField action={this.handler} id={'school'} defaultValue={this.state.profile.school}/> <br/>
            <SingleInputField action={this.handler} id={'studentAssociation'} defaultValue={this.state.profile.studentAssociation}/> <br/>
            <SingleInputField action={this.handler} id={'description'} defaultValue={this.state.profile.description}/> <br/>
            <SingleInputField action={this.handler} id={'campus'} defaultValue={this.state.profile.campus}/><br/>*/}
        </div>
          <button onClick={this.submitData}>{language.profileButton[this.context.language]}</button>
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
