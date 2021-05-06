import axios from "axios";
import React, { Component } from "react";
import { Spinner } from "react-bootstrap";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      inputVal: "",
      persons: [],
      github_url: "",
      loading: false,
    };
    this.updateInputValue = this.updateInputValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateInputValue(event) {
    event.preventDefault();
    this.setState({ inputVal: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    axios
      .post(
        "https://v2-github-discord-api-and-me.herokuapp.com/github_discord_urls",
        {
          url: this.state.inputVal,
        }
      )
      .then((res) => {
        this.setState({ github_url: res.data });
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        alert(err.response.data["error"]);
      });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="url"
          value={this.state.inputValue}
          placeholder="Please enter your discord webhook link.."
          onChange={(event) => this.updateInputValue(event)}
          className="col-sm-6 col-md-6"
        />
        <br />
        <input
          type="submit"
          value="Submit"
          className="btn btn-success"
          style={{ margin: "10px" }}
        />
        <br />
        <br />
        <p>The link to be pasted in github will appear below:</p>
        {this.state.loading ? <Spinner animation="border" /> : null}
        <p>{this.state.github_url}</p>
      </form>
    );
  }
}

export default Home;
