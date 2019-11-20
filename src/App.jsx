import React, { Component } from "react"; // 1
import { connect } from "react-redux";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import UserHomePage from "./UserHomePage.jsx";
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
    if (this.props.username === "") {
      // 3
      return (
        <div>
          <div className="nav-bar">
            <SignUp />
            <Login />
          </div>
          SEGDRHDJT
        </div>
      ); // 3
    } else {
      return <UserHomePage username={this.props.username} />;
    }
  };
}
let mapStateToProps = st => {
  return {
    username: st.username
  };
};
let App = connect(mapStateToProps)(unconnectedApp);
export default App;
