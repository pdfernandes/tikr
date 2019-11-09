import React from "react";
import { Link } from "react-router-dom";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: "",
      email: "",
      fname: "",
      lname: "",
      password: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleClick() {
    this.props.clearErrors();
  }
  render() {
    let usernameError = null;
    let emailError = null;
    let fnameError = null;
    let lnameError = null;
    let passwordError = null;
    let usernameClassError;
    let emailClassError;
    let fnameClassError;
    let lnameClassError;
    let passwordClassError;
    const errorTitles = ["Username", "Email", "Fname", "Lname", "Password"];

    this.props.errors.forEach(error => {
      let word = error.split(" ")[0];
      if (errorTitles.includes(word)) {
        switch (word) {
          case "Username":
            usernameClassError = "errored";
            usernameError = (
              <div className="error-container">
                <div className="signup-error">
                  {"Please enter your desired username."}
                </div>
                <div className="arrow"></div>
              </div>
            );
            return;
          case "Email":
            emailClassError = "errored";
            emailError = (
              <div className="error-container">
                <div className="signup-error">
                  {"Please enter your email address."}
                </div>{" "}
                <div className="arrow"></div>
              </div>
            );
            return;
          case "Fname":
            fnameClassError = "errored";
            fnameError = (
              <div className="error-container">
                <div className="signup-error">
                  {"Please enter your first name."}
                </div>
                <div className="arrow"></div>
              </div>
            );
            return;
          case "Lname":
            lnameClassError = "errored";
            lnameError = (
              <div className="error-container">
                <div className="signup-error">
                  {"Please enter your last name."}
                </div>
                <div className="arrow"></div>
              </div>
            );
            return;
          case "Password":
            passwordClassError = "errored";
            passwordError = (
              <div className="error-container">
                <div className="signup-error">
                  {"Your password must be at least 10 characters."}
                </div>
                <div className="arrow"></div>
              </div>
            );
            return;
        }
      }
    });

    return (
      <main className="signup-form-container">
        <form onSubmit={this.handleSubmit} className="signup-form">
          <div className="signup-header">
            <h1>Make Your Money Move</h1>
            <h2>
              Tikr lets you make pretend you're investing, commission free.
            </h2>
          </div>
          <div className="signup-component">
            <div className="names">
              <label>
                <input
                  onClick={this.handleClick}
                  className={`signup-input ${fnameClassError}`}
                  type="text"
                  value={this.state.fname}
                  onChange={this.update("fname")}
                  placeholder="First Name"
                />
                {fnameError}
              </label>

              <label>
                <input
                  onClick={this.handleClick}
                  className={`signup-input ${lnameClassError}`}
                  type="text"
                  value={this.state.lname}
                  onChange={this.update("lname")}
                  placeholder="Last Name"
                />
                {lnameError}
              </label>
            </div>

            <label>
              <input
                onClick={this.handleClick}
                className={`signup-input ${emailClassError}`}
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email address"
              />
              {emailError}
            </label>
            <label>
              <input
                onClick={this.handleClick}
                className={`signup-input ${usernameClassError}`}
                type="text"
                value={this.state.username}
                onChange={this.update("username")}
                placeholder="Username"
              />
              {usernameError}
            </label>
            <label>
              <input
                onClick={this.handleClick}
                className={`signup-input ${passwordClassError}`}
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                placeholder="Password (min. 10 characters)"
              />
              {passwordError}
            </label>
            <div className="signup-button-container">
              <input className="signup-submit" type="submit" value="Sign Up" />
            </div>
          </div>
        </form>
      </main>
    );
  }
}

export default SignupForm;
