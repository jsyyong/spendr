import React, { Component } from "react";
import { connect } from "react-redux";

let unique = arr => {
  let obj = {};
  arr.forEach(x => {
    obj[x] = true;
  });
  return Object.keys(obj);
};
let usernameList = names => {
  return (
    <ul>
      {unique(names).map(userName => {
        return <li>{userName}</li>;
      })}
    </ul>
  );
};

class unconnectedReviewMessages extends component {
  usernames = () => {
    let now = new Date() / 1;
    let recentMessages = this.props.messages.filter(msg => {
      return now - msg.timestamp < 5 * 60 * 1000;
    });
    let recentNames = recentMessages.map(msg => {
      return msg.username;
    });
    return recentNames;
  };

  componentDidMount = () => {
    let updateMessages = async () => {
      let response = await fetch("/reviews?username=" + state.username);
      let responseBody = await response.text();
      console.log("response from reviews", responseBody);
      let parsed = JSON.parse(responseBody);
      console.log("parsed", parsed);
      this.props.dispatch({
        type: "set-messages",
        messages: parsed
      });
    };
    setInterval(updateMessages, 500);
  };

  render = () => {
    let msgToElement = e => (
      <li>
        {" "}
        [{e.timestamp}] {e.username}:{e.message}{" "}
      </li>
    );
    return (
      <div class="two-col">
        <div>{usernameList(this.usernames())}</div>
        <div>
          <ul>{this.props.messages.map(msgToElement)}</ul>
        </div>
      </div>
    );
  };
}

let mapStatetoProps = state => {
  return {
    reviews: state.reviews,
    username: state.username
  };
};
let ReviewMessages = connect(mapStatetoProps)(unconnectedReviewMessages);
export default ReviewMessages;
