import React, { Component } from "react";
import { connect } from "react-redux";
class unconnectedDeleteSingleMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      _id: this.props.productId
    };
  }
  deleteHandler = async event => {
    console.log("the unique id", this.state._id);
    event.preventDefault();
    let _id = this.state._id;
    let response = await fetch("/deleteSingleMsg?_id=" + _id, {
      method: "POST"
    });
    let body = await response.json();
    if (!body.success) {
      console.log("deletion fail :(");
      return;
    }
    console.log("deleteHandler body", body);
    this.props.reload();
    return;
  };

  render = () => {
    return (
      <button type="button" onClick={this.deleteHandler}>
        Delete
      </button>
    );
  };
}
let DeleteSingleMessage = connect()(unconnectedDeleteSingleMessage);
export default DeleteSingleMessage;
