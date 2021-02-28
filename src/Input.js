import axios from "axios";
import React, { Component } from "react";

class Input extends Component {
  constructor() {
    super();
    this.state = {
      inputVal: "",
      persons: [],
      github_url: "",
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
    if (this.state.inputVal === "") {
      alert("Please enter a url");
    } else {
      axios
        .post("http://localhost:3000/github_discord_urls", {
          url: this.state.inputVal,
        })
        .then((res) => {
          this.setState({ github_url: res.data });
          console.log(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="url"
          value={this.state.inputValue}
          placeholder="Please enter your discord webhook link.."
          onChange={(event) => this.updateInputValue(event)}
          className="input"
        />
        <input type="submit" value="Submit" className="btn btn-success" style={{margin:"10px"}}/>
        <br />
        <br />
        <p>The link to be pasted in github will appear below:</p>
        <p>{this.state.github_url}</p>
      </form>
    );
  }
}

export default Input;
