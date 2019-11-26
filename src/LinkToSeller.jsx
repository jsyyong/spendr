import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class unconnectedLinkToSeller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: this.props.seller
    };
  }

  submitHandler = event => {
    this.props.dispatch({
      type: "set-seller",
      seller: this.state.seller
    });
  };

  render = () => {
    return (
      <Link to={"/seller/" + this.state.seller}>
        <button className="productDetailsButtons" onClick={this.submitHandler}>
          Listed by{" " + this.state.seller}
        </button>
      </Link>
    );
  };
}
let LinkToSeller = connect()(unconnectedLinkToSeller);
export default LinkToSeller;
