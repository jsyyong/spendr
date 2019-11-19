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

      reload = async () => {
        let response = await fetch("/image-userPage");
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
          <div>
            <div>
              {this.state.posts.reverse().map(p => (
                <Post key={p._id} contents={p} />
              ))}
            </div>
            <NewPost reload={this.reload} />
          </div>
        );
      };
}