import { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import { RiLoginCircleFill } from "react-icons/ri";
import "./index.css";

export default class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
  };

  onChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  onChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  submitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, {
      expires: 100,
      path: "/",
    });
    console.log(jwtToken);
    const { history } = this.props;
    history.push("/");
  };

  submitFailure = (errorMsg) => {
    this.setState({
      showSubmitError: true,
      errorMsg,
    });
  };

  onClickLoginButton = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const userDetails = { email, password };
    const loginUrl = "http://testing-intern-api.herokuapp.com/api/user/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(loginUrl, options);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      this.submitSuccess(data.jwt_token);
      console.log(data.jwt_token);
    } else {
      this.submitFailure(data.error_msg);
    }
  };

  render() {
    const { email, password, showSubmitError, errorMsg } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      <Redirect to="/" />;
    }
    return (
      <form onSubmit={this.onClickLoginButton} className="form">
        <div className="form-container">
          <div>
            <RiLoginCircleFill className="logo" />
          </div>
          <div className="credentials">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={email}
              onChange={this.onChangeEmail}
              id="email"
            />
          </div>
          <div className="credentials">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={this.onChangePassword}
              id="password"
            />
          </div>
          {showSubmitError && <p className="error-msg">{errorMsg}</p>}
          <button className="login-btn" type="submit">
            Login
          </button>
        </div>
      </form>
    );
  }
}
