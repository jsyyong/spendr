import React, { Component } from "react";
import { connect } from "react-redux";
class unconnectedDeleteForm extends Component {
  deleteAllHandler = async event => {
    event.preventDefault();
    let response = await fetch("/deleteAll", { method: "POST" });
    let body = await response.json();
    console.log("deleteAllHandler body", body);
    this.props.reload();
  };

  render = () => {
    return (
      <button type="button" onClick={this.deleteAllHandler}>
        Delete All Products
      </button>
    );
  };
}
let DeleteForm = connect()(unconnectedDeleteForm);
export default DeleteForm;
