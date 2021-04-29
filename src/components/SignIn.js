import axios from "axios";
import React from "react";
import { Component } from "react";
import { Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./SignIn.css";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userAuthenticated: false,
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChangeNavbar = this.onChangeNavbar.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeNavbar() {
    this.props.navbarChange();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    axios
      .post("https://v2-github-discord-api-and-me.herokuapp.com/user_auth", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("accessTokenSecret", res.data["success"]);
          localStorage.setItem("userEmail", this.state.email);
          this.onChangeNavbar();
          this.setState({ userAuthenticated: true });
          this.setState({ loading: false });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
        alert(err.response.data["error"]);
      });
  }

  render() {
    return (
      <form>
        <h2>Sign in</h2>
        <br />
        <div className="form-group col-sm-6 col-md-6 col-lg-4 mx-auto">
          <label htmlFor="exampleInputEmail1" className="label">
            Email address
          </label>
          <input
            value={this.state.email}
            onChange={this.handleChange}
            type="email"
            name="email"
            className="form-control input"
            placeholder="Enter your email address..."
          />
        </div>
        <div className="form-group col-sm-6 col-md-6 col-lg-4 mx-auto">
          <label htmlFor="exampleInputPassword1" className="label">
            Password
          </label>
          <input
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
            name="password"
            className="form-control input"
            placeholder="Password"
          />
          <br />
          <button
            className="col-sm-12 col-md-12 btn-in rounded"
            onClick={this.handleSubmit}
          >
            Continue with email
          </button>
          {this.state.loading ? <Spinner animation="border" /> : null}
        </div>
        {this.state.userAuthenticated ? <Redirect to="/home" /> : null}
        {localStorage.accessTokenSecret ? <Redirect to="/home" /> : null}
      </form>
    );
  }
}

export default SignIn;
