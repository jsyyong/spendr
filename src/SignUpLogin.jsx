import React, { Component } from "react";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import { connect } from "react-redux";
import UserHomePage from "./UserHomePage.jsx";

class unconnectedSignUplogin extends Component {

  componentDidMount = async () => {
    let response = await fetch("/check-login", {
      method: "POST",
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("responseBody from login", responseBody);
    let body = JSON.parse(responseBody);
    console.log("parsed body", body);
    if (!body.success) {
      console.log("cookie fail");
      return;
    }
    console.log("cookie dispatchinng")
    this.props.dispatch({
      type: "signin",
      username: body.username
    });
  };

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
