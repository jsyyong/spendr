import React, { Component } from "react";
import { connect } from "react-redux";

class User extends Component {
  constructor() {
    super();
    this.state = {
      username: this.state.username,
      post: []
    };
  }
  sendingUsername = async () => {
    let name = this.state.username;
    let data = new FormData();
    data.append("username", name);
    await fetch("/image-userPage", { method: "POST", body: data });
  };

  reload = async () => {
    let response = await fetch("/image-userPage");
    let body = await response.text();
    console.log("/image-userPage response", body);
    body = JSON.parse(body);
    this.setState({ posts: body });
  };
  componentDidMount = () => {
    this.sendingUsername();
    this.reload();
  };
  render = () => {
    return (<>
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
