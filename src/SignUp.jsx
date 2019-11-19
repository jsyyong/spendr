import React, { Component } from "react"; 
import { connect } from "react-redux";

class SignUp extends Component {
  constructor() {
    // 2
    super(); // 2
    this.state = {
      // 2
      usernameInput: "", // 2
      passwordInput: "", // 2
      username: undefined // 2
    }; // 2
  }
  usernameChange = evt => {
    // 4
    this.setState({ usernameInput: evt.target.value }); // 4
  }; // 4
  passwordChange = evt => {
    // 5
    this.setState({ passwordInput: evt.target.value }); // 5
  };
  submitHandlerSignUp = async evt => {
    evt.preventDefault();
    let name = this.state.usernameInput; // 6
    let data = new FormData(); // 7
    data.append("username", name); // 7
    data.append("password", this.state.passwordInput); // 7
    let response = await fetch("/signup", { method: "POST", body: data }); // 8
    let body = await response.text(); // 8
    console.log("/signup response", body); // 8
    body = JSON.parse(body); // 8
    if (body.success) {
      // 9
      this.setState({ username: name }); // 9
      this.props.dispatch({ type: "signin" });
      this.props.dispatch({ type: "set-username", name: name });
    }
  };
  render = () => {
    if (this.state.username === undefined) {
      // 3
      return (
        <div>
          SignUp
          <form onSubmit={this.submitHandlerSignUp}>
            Username <input type="text" onChange={this.usernameChange} />
            Password <input type="text" onChange={this.passwordChange} />
            <input type="submit" value="login" />
          </form>
        </div>
      ); // 3
    } // 3
    // return <Content />; // 3
  };
}

let connectedSignUp = connect()(SignUp);

export default connectedSignUp;
