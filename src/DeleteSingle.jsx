import React, { Component } from "react";
import { connect } from "react-redux";
class unconnectedDeleteSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product
    };
  }
  deleteHandler = async event => {
    let imgPath = this.state.product.imgPath;
    console.log(imgPath);
    /*event.preventDefault();
    let response = await fetch("/deleteAll?imgPath", { method: "POST" });
    let body = await response.json();
    console.log("deleteAllHandler body", body);
    this.props.reload();*/
  };

  render = () => {
    return (
      <button type="button" onClick={this.deleteHandler}>
        Delete
      </button>
    );
  };
}
let DeleteSorm = connect()(unconnectedDeleteSingle);
export default DeleteSorm;
