import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import language from "../../properties/language";
import { UserContext } from "../../context/userContext";
import { DARK_GREEN, GREEN, WHITE } from "../../helpers/constants";
import DefaultButton from "../../components/defaultButton";
import { endpoint, url } from "../../api";
import DefaultInput from "../../components/defaultInput";

class AddQuestion extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      questionFin: "",
      area: "",
      selectValue: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  selectBoxChanged = (event) => {
    this.setState({ selectValue: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const question = {
      question: this.state.question,
      questionFin: this.state.questionFin,
      area: this.state.selectValue,
    };
    axios
      .post(url + endpoint.addQuestion, question)
      .then((res) => {
        Swal.fire({
          title: language.addQuestions[this.context.language],
          icon: "success",
          confirmButtonText: language.confirm[this.context.language],
        });
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ question: "" });
    this.setState({ questionFin: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div
          style={{
            marginTop: 20,
            maxWidth: 500,
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#FFFFFF",
            padding: 15,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <DefaultInput
              label="Question in english"
              type="question"
              name="question"
              value={this.state.question}
              onChange={this.handleChange}
              required={true}
            />

            <DefaultInput
              label="Kysymys suomeksi"
              type="question"
              name="questionFin"
              value={this.state.questionFin}
              onChange={this.handleChange}
              required={true}
            />

            <label style={{ fontSize: 16, marginTop: 5 }}>
              {language.school[this.context.language]}
            </label>
            <select
              style={{
                marginBottom: 10,
                fontSize: 16,
                padding: "6px 4px",
              }}
              value={this.state.selectValue}
              onChange={this.selectBoxChanged}
            >
              <option selected value="Undefined">
                Undefined
              </option>
              <option value="ASK">ASK</option>
              <option value="Helga">Helga</option>
              <option value="HUMAKO">HUMAKO</option>
              <option value="JAMKO">JAMKO</option>
              <option value="Laureamko">Laureamko</option>
              <option value="METKA">METKA</option>
              <option value="O'Diako">O'Diako</option>
              <option value="TUO">TUO</option>
            </select>

            <DefaultButton
              type="submit"
              borderColor={DARK_GREEN}
              backgroundColor={GREEN}
              textColor={WHITE}
              text={language.addQuestionButton[this.context.language]}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default AddQuestion;
