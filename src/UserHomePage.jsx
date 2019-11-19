import React, { Component } from "react";
import { connect } from "react-redux";

class unconnectedUserHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      posts: []
    };
  }

  reload = async () => {
    let name = this.state.username;
    let data = new FormData();
    data.append("username", name);
    let response = await fetch("/image-userPage", {
      method: "POST",
      body: data
    });
    let body = await response.text();
    console.log("/image-userPage response", body);
    body = JSON.parse(body);
    this.setState({ posts: body });
  };
  componentDidMount = () => {
    this.reload();
  };
  render = () => {
    return (
      <>
        <div>
          <p>test</p>
        </div>
        <div>
          {this.state.posts.reverse().map(p => (
            <div>{p} </div>
          ))}
        </div>
      </>
    );
  };
}
let mapStateToProps = st => {
  return {};
};
let UserHomePage = connect(mapStateToProps)(unconnectedUserHomePage);
export default UserHomePage;
