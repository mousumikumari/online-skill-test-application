import React, { Component } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import "./FirstPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { testActive } from "./Utilities/Index";

const skillLevels = ["Level 1", "Level 2", "Level 3"];

class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsLevelFilled: false,
      IsAgreed: false,
      IsQuizSubmitted: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      isRegistered: false,
      skillLevel: "Select the skill level",
    };
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userInformation"));
    const { history } = this.props;
    if (!userData) {
      history.push("/");
    }
    this.setState({
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: userData.password,
      email: userData.email,
      gender: userData.gender,
      isRegistered: userData.isRegistered,
    });
  }

  /**
  * Handle skill level selected
  *
   * @param {string} eventKey Skill level selected
   * @param {*} event
   */
  handleSelect(eventKey) {
    this.setState({ skillLevel: eventKey, IsLevelFilled: true });
  }

  handleAgreement() {
    const { IsAgreed } = this.state;
    this.setState({ IsAgreed: !IsAgreed });
  }

  startTestHandler = () => {
    localStorage.removeItem("state");
    testActive();
    const { history } = this.props;
    history.push({
      pathname: "/Questions",
      state: { ...this.state },
    });
  };

  render() {
    const { IsLevelFilled, skillLevel, IsAgreed } = this.state;
    const style = {
      padding: "16px",
      margin: "16px",
    };
    const listStyle = {
      listStyleType: "none", // Error
    };

    return (
      <div className="container">
        <div style={style}>
          <h3>TEST DETAILS</h3>
          <h4>Things To Remember</h4>
          <ul style={listStyle}>
            <li style={{ marginBottom: "1em" }}>
              1.Before starting the test, please close all chat windows etc and
              make sure you have a stable internet connection
            </li>
            <li style={{ marginBottom: "1em" }}>
              2.There are single choice and multiple choice questions
            </li>
            <li style={{ marginBottom: "1em" }}>
              3.A start button will start the test with specific time
            </li>
            <li style={{ marginBottom: "1em" }}>
              4.Timer will be displayed on the screen
            </li>
            <li style={{ marginBottom: "1em" }}>
              5.The time limit for the test is 10 minutes.
            </li>
          </ul>
        </div>
        <div className="button-center">
          <DropdownButton
            title={skillLevel}
            id="selectLevel"
            className="select"
            onSelect={(eventKey) => this.handleSelect(eventKey)}
          >
            {skillLevels.map((opt) => (
              <Dropdown.Item as="button" eventKey={opt} key={opt}>
                {opt}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <div className="checkbox">
            <label
              className="checkbox-inline"
              htmlFor="{choice}"
              style={{ fontWeight: "bold" }}
            >
              <input
                type="checkbox"
                value="agreement"
                onChange={() => this.handleAgreement()}
              />
              I agree to the Terms and Conditions
            </label>
            <br />
          </div>
        </div>

        {IsLevelFilled && IsAgreed && (
          <div className="buttonContainer">
            <button
              type="button"
              className="Button"
              onClick={this.startTestHandler}
            >
              Start Test
            </button>
          </div>
        )}
      </div>
    );
  }
}
FirstPage.propTypes = {
  history: PropTypes.func.isRequired,
};
export default FirstPage;
