import React, { Component } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import axios from "axios";
import Picture from "../../components/partials/picture";
import FileUpload from "../../components/fileUpload";
import Swal from "sweetalert2";
import language from "../../properties/language";
import DefaultButton from "../../components/defaultButton";
import { DARK_GREEN, GREEN, WHITE } from "../../helpers/constants";
import { endpoint, url } from "../../api";
import DefaultInput from "../../components/defaultInput";

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
    await axios
      .post(url + endpoint.profile, { email: email })
      .then((res) => {
        console.log(res.data);
        this.setState({ profile: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updatePicture = (data) => {
    this.setState((state) => ({
      ...state,
      profile: {
        ...state.profile,
        image: data.filePath,
      },
    }));
  };

  componentDidMount() {
    this.fetchData();
  }

  submitData = async (e) => {
    e.preventDefault();
    await axios
      .post(url + endpoint.editInformation, { data: this.state.profile })
      .then((res) => {
        console.log(res.data);
        this.setState({ profile: res.data });
        Swal.fire({
          title: "You've Succesfully changed profile data",
          text: "You may now enter",
          icon: "success",
          confirmButtonText: "Confirm",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onChange = (e) => {
    let target = e.target;
    this.setState((prevState) => {
      let profile = { ...prevState.profile };
      profile[target.id] = target.value;
      return { profile };
    });
  };

  render() {
    const { profile } = this.state;
    if (!profile) {
      return null;
    }
    let information = [
      {
        value: profile.name,
        id: "name",
        placeholder: language.firstName[this.context.language],
      },
      {
        value: profile.surname,
        id: "surname",
        placeholder: language.surName[this.context.language],
      },
      {
        value: profile.school,
        id: "school",
        placeholder: language.school[this.context.language],
      },
      {
        value: profile.studentAssociation,
        id: "studentAssociation",
        placeholder: language.selectStudentAssociation[this.context.language],
      },
      {
        value: profile.description,
        id: "description",
        placeholder: language.description[this.context.language],
      },
      {
        value: profile.campus,
        id: "campus",
        placeholder: language.campus[this.context.language],
      },
    ];
    return (
      <div
        className="homeScreen"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          maxWidth: 500,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <form onSubmit={this.submitData}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            {profile.image && (
              <div
                style={{
                  width: 100,
                  height: 120,
                  objectFit: "contain",
                  overflow: "hidden",
                  borderRadius: "50%",
                }}
              >
                <Picture
                  source={process.env.PUBLIC_URL + profile.image}
                  style={{ width: "100%" }}
                />
              </div>
            )}
          </div>
          {information &&
            React.Children.toArray(
              information.map((info) => (
                <div>
                  <DefaultInput
                    label={info.placeholder}
                    type="text"
                    name="password"
                    value={info.value}
                    onChange={this.onChange}
                    className="profileInput"
                    id={info.id}
                    required
                  />
                </div>
              ))
            )}
          <FileUpload
            email={profile.email}
            onUpload={this.updatePicture}
          ></FileUpload>
          <DefaultButton
            type="submit"
            borderColor={DARK_GREEN}
            backgroundColor={GREEN}
            textColor={WHITE}
            // onClick={this.submitData}
            text={language.updateButton[this.context.language]}
          />
          <hr />
          {/*fix this because right now this part only shows undefined questions*/}
          {/* {console.log(profile.email, profile.studentAssociation)} */}
          <Link
            to={{
              pathname: "/Form/" + profile.studentAssociation,
              data: {
                email: profile.email,
              },
            }}
          >
            {" "}
            {language.formLink[this.context.language]}
          </Link>
          <br />
        </form>
        {/*<SingleInputField action={this.handler} id={'name'} defaultValue={this.state.profile.name}/> <br/>
            <SingleInputField action={this.handler} id={'surname'} defaultValue={this.state.profile.surname}/> <br/>
            <SingleInputField action={this.handler} id={'school'} defaultValue={this.state.profile.school}/> <br/>
            <SingleInputField action={this.handler} id={'studentAssociation'} defaultValue={this.state.profile.studentAssociation}/> <br/>
            <SingleInputField action={this.handler} id={'description'} defaultValue={this.state.profile.description}/> <br/>
            <SingleInputField action={this.handler} id={'campus'} defaultValue={this.state.profile.campus}/><br/>*/}
      </div>
    );
  }
}

export default Profile;
