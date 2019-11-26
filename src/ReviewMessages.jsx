import React, { Component } from "react";
import { connect } from "react-redux";
import DeleteSingleMessage from "./DeleteSingleMessage.jsx";

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

class unconnectedReviewMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      timeStamp: ""
    };
  }
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
      let productId = this.props.productId;
      let response = await fetch("/reviews?productId=" + productId, {
        method: "POST"
      });
      let responseBody = await response.text();
      console.log("response from reviews", responseBody);
      let parsed = JSON.parse(responseBody);
      console.log("parsed", parsed);

      this.setState({
        messages: parsed
      });
    };
    setInterval(updateMessages, 500);
  };

  render = () => {
    let msgToElementAdmin = e => (
      <div>
        [Admin Privilege] {e.username} wrote: {e.message}{" "}
        <DeleteSingleMessage
          productId={e._id}
          reload={this.componentDidMount}
        />
      </div>
    );
    let msgToElement = e => (
      <div>
        {e.username} wrote: {e.message}{" "}
      </div>
    );
    if (this.props.username === "jeff") {
      return (
        <div class="two-col">
          <div>{this.state.messages.map(msgToElementAdmin)}</div>
        </div>
      );
    }
    return (
      <div class="two-col">
        <div>{this.state.messages.map(msgToElement)}</div>
      </div>
    );
  };
}

let mapStatetoProps = state => {
  return {
    reviews: state.reviews,
    username: state.username,
    messages: state.messages
  };
};
let ReviewMessages = connect(mapStatetoProps)(unconnectedReviewMessages);
export default ReviewMessages;
