import React, { Component } from "react";
import { connect } from "react-redux";
class unconnectedDeleteSingleCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      _id: this.props.product._id
    };
  }
  deleteHandler = async event => {
    console.log("the unique id",this.state._id);
    event.preventDefault();
    let _id = this.state._id
    let response = await fetch("/deleteSingleCart?_id=" + _id, {
      method: "POST"
    });
    let body = await response.json();
    if (!body.success){
        console.log("deletion fail :(")
        return
    }
    console.log("deleteHandler body", body);
    this.props.reload();
    await this.props.reloadCart();
    return
  };

  render = () => {
    return (
      <button type="button" onClick={this.deleteHandler}>
        Delete
      </button>
    );
  };
}
let DeleteSingleCart = connect()(unconnectedDeleteSingleCart);
export default DeleteSingleCart;