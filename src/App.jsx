import React, { Component } from "react"; // 1
import { connect } from "react-redux";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
class unconnectedApp extends Component {
  // 1
  constructor() {
    // 2
    super(); // 2
    this.state = {
      // 2
      usernameInput: "", // 2
      passwordInput: "", // 2
      username: undefined // 2
    }; // 2
  } // 2
  usernameChange = evt => {
    // 4
    this.setState({ usernameInput: evt.target.value }); // 4
  }; // 4
  passwordChange = evt => {
    // 5
    this.setState({ passwordInput: evt.target.value }); // 5
  }; // 5

  // 6
  render = () => {
    // 3
    if (this.state.username === undefined) {
      // 3
      return (
        <div className="nav-bar">
          <SignUp />
          <Login />
        </div>
      ); // 3
    } // 3
    // return <Content />; // 3
  };
}
let App = connect()(unconnectedApp);
export default App;
