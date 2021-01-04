import React, { Component } from 'react';
import './UserRegistration.css';
import { isLogin, login } from "../../Components/Utilities/Index";
import PropTypes from "prop-types";

class userRegistration extends Component{
    constructor(props) {
        super(props)
        if (isLogin()) {
          props.history.push("/Home");
        }
        this.state = {
            firstName: "",
            lastName: "",
            password: "",
            gender: "",
            email:"",
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
            formValid: false
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    };
    
    handleSubmit = (event) => {
        alert(`${this.state.firstName} ${this.state.lastName}  Registered Successfully !!!!`)
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
    }
    handleUserInput = (event) => {
        const { name } = event.target;
        const { value } = event.target;
        this.setState({ [name]: value }, () => {
          this.validateField(name, value);
        });
      };
      validateField(fieldName, value) {
        const { formErrors } = this.state;
        let {
          emailValid, passwordValid, firstNameValid, lastNameValid, genderValid,
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
          }, () => {
            if (emailValid
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
    
    render(){
        const {
            formErrors, firstName, lastName, password, email, formValid,
          } = this.state;
        return(
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
                <label>FirstName :</label> <input type="text"  id="firstName" name="firstName" value={this.state.firstName} onChange={this.handleUserInput} placeholder="FirstName..." /><br />
                <label>LastName :</label> <input type="text" id="lastName" name="lastName"    value={this.state.lastName} onChange={this.handleUserInput} placeholder="LastName..." /><br />
                <label>Password :</label> <input type="password" id="password" name="password"    value={this.state.password} onChange={this.handleUserInput} placeholder="Password..." /><br />
                <label>Email :</label> <input type="text" id="email" name="email"   value={this.state.email} onChange={this.handleUserInput} placeholder="Email..." /><br />
                <label>Gender :</label><select id="gender" name="gender"  onChange={this.handleUserInput} defaultValue="Select Gender">
                    <option defaultValue>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select><br />
                <input type="submit" value="Submit"  disabled={!formValid}/>
               
            </form>

        </div>
        );
    }
}
userRegistration.propTypes = {
  history: PropTypes.func.isRequired,
};
export default userRegistration;