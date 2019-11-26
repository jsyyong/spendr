import React, { Component } from "react";
import { connect } from "react-redux";
class unconnectedDeleteSingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      _id: this.props.product._id
    };
  }
  deleteHandler = async event => {
    console.log("the unique id", this.state._id);
    event.preventDefault();
    let _id = this.state._id;
    let response = await fetch("/deleteSingleProduct?_id=" + _id, {
      method: "POST"
    });
    let body = await response.json();
    if (!body.success) {
      console.log("deletion fail :(");
      return;
    }
    console.log("deleteHandler body", body);
    //this.props.reload();
    //await this.props.reloadProduct();
    let response2 = await fetch("/product", { method: "POST" });
    let body2 = await response2.text();
    body2 = JSON.parse(body2);
    console.log("/product response", body2);
    this.props.dispatch({ type: "set-products", products: body2 });
  };

  render = () => {
    if (this.props.username === "jeff") {
      return (
        <button type="button" onClick={this.deleteHandler}>
          Delete
        </button>
      );
    }
    return <div></div>;
  };
}
let mapStateToProps = state => {
  return {
    username: state.username
  };
};
let DeleteSingleProduct = connect(mapStateToProps)(
  unconnectedDeleteSingleProduct
);
export default DeleteSingleProduct;
