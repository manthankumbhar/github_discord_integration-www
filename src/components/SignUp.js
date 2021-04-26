import axios from "axios";
import React from "react";
import { Component } from "react";
import { Redirect } from "react-router";
import "./SignUp.css";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      userRegistered: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.inputVal === "") {
      alert("Please enter a url");
    } else {
      axios
        .post(
          "https://v2-github-discord-api-and-me.herokuapp.com/user_signup",
          {
            email: this.state.email,
            password: this.state.password,
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            alert("user added, please sign in now.");
            this.setState({ userRegistered: true });
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  render() {
    return (
      <form>
        <h2>Sign up</h2>
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
            onClick={this.handleSubmit}
            className="col-sm-12 col-md-12 btn-in rounded"
          >
            Signup with email
          </button>
          {this.state.userRegistered ? <Redirect to="/" /> : null}
        </div>
      </form>
    );
  }
}

export default SignUp;
