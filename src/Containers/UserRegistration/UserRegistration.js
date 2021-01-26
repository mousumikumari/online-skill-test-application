import React, { Component } from "react";
import "./UserRegistration.css";
import PropTypes from "prop-types";
import { isLogin, login } from "../../Components/Utilities/Index";

class userRegistration extends Component {
  constructor(props) {
    super(props);
    if (isLogin()) {
      props.history.push("/Home");
    }
    this.state = {
      firstName: "",
      lastName: "",
      password: "",
      gender: "",
      email: "",
      isRegistered: false,
      formErrors: {
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        password: "",
      },
      firstNameValid: false,
      lastNameValid: false,
      emailValid: false,
      passwordValid: false,
      genderValid: false,
      formValid: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Handle registration form submit
   */
  handleSubmit = () => {
    const { history } = this.props;
    this.setState(
      {
        isRegistered: true,
      },
      () => {
        login();
        this.setLocalStorage();
        history.push({
          pathname: "/Home",
          state: { ...this.state },
        });
      },
    );
  };

  setLocalStorage = () => {
    localStorage.setItem("userInformation", JSON.stringify(this.state));
  };

  /**
   *
   * Store and Validate user input
   * @param {object} e User Input
   */
  handleUserInput = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  /**
   * Validate User Input
   *
   * @param {string} fieldName field to validate
   * @param {string} value fields value
   */
  validateField(fieldName, value) {
    const { formErrors } = this.state;
    let {
      emailValid,
      passwordValid,
      firstNameValid,
      lastNameValid,
      genderValid,
    } = this.state;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = emailValid ? "" : " is invalid";
        break;
      case "password":
        passwordValid = value.length >= 5;
        formErrors.password = passwordValid ? "" : " is too short";
        break;
      case "firstName":
        firstNameValid = value.length >= 2;
        formErrors.firstName = firstNameValid ? "" : " is too short";
        break;
      case "lastName":
        lastNameValid = value.length >= 2;
        formErrors.lastName = lastNameValid ? "" : " is too short";
        break;
      case "gender":
        genderValid = value.length >= 4 && value.length <= 6;
        formErrors.gender = genderValid ? "" : " not selected";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors,
        emailValid,
        passwordValid,
        lastNameValid,
        firstNameValid,
        genderValid,
      },
      () => {
        if (
          emailValid
          && passwordValid
          && firstNameValid
          && lastNameValid
          && genderValid
        ) {
          this.setState({
            formValid: true,
          });
        } else {
          this.setState({
            formValid: false,
          });
        }
      },
    );
  }

  render() {
    const {
      formErrors, formValid, firstName, lastName, password, email,
    } = this.state;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h1>User Registration</h1>
          <div className="panel">
            {Object.keys(formErrors).map((fieldName) => {
              if (formErrors[fieldName].length > 0) {
                return (
                  <p key={fieldName}>
                    {fieldName} {formErrors[fieldName]}
                  </p>
                );
              }
              return "";
            })}
          </div>

          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={this.handleUserInput}
            placeholder="FirstName..."
          />
          <br />

          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={this.handleUserInput}
            placeholder="LastName..."
          />
          <br />

          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={this.handleUserInput}
            placeholder="Password..."
          />
          <br />

          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={this.handleUserInput}
            placeholder="Email..."
          />
          <br />

          <select
            id="gender"
            name="gender"
            onChange={this.handleUserInput}
            defaultValue="Select Gender"
          >
            <option defaultValue>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <br />
          <input type="submit" value="Submit" disabled={!formValid} />
        </form>
      </div>
    );
  }
}
userRegistration.propTypes = {
  history: PropTypes.func.isRequired,
};
export default userRegistration;
