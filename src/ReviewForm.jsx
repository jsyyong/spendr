import React, { Component } from "react";
import { connect } from "react-redux";
class unconnectedReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  submitHandler = async event => {
    console.log("???");
    event.preventDefault();
    console.log("form submitted");
    let data = new FormData();
    data.append("msg", this.state.message);
    data.append("username", this.props.username);
    let response = await fetch("/newReview", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let body = await response.text();
    body = JSON.parse(body);
    this.setState({ message: "" });
    console.log("query body", body);
    if (!body.success) {
      console.log("submitHandler failed :(");
      return;
    }
    console.log("submitHandler success!!");
    return;
  };

  inputHandler = event => {
    console.log("inside the inputHandler!", event.target.value);
    this.setState({ message: event.target.value });
  };

  render = () => {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input onChange={this.inputHandler} value={this.state.message} />
          <input type="submit" />
        </form>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    username: state.username
  };
};
let ReviewForm = connect(mapStateToProps)(unconnectedReviewForm);
export default ReviewForm;
