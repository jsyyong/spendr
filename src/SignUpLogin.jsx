import React, { Component } from "react";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import { connect } from "react-redux";
import UserHomePage from "./UserHomePage.jsx";

class unconnectedSignUplogin extends Component {
  render = () => {
    if (this.props.username === "") {
      return (
        <div>
          <SignUp />
          <Login />
        </div>
      );
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

let SignUplogin = connect(mapStateToProps)(unconnectedSignUplogin);
export default SignUplogin;
