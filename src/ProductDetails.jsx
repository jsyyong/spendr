import React, { Component } from "react";
import { connect } from "react-redux";

class unconnectedProductDetails extends Component {
  render() {
    return (
      <div>
        <img height="25%" width="25%" src={this.props.product.imgPath} />

        <h2>{this.props.product.brand}</h2>
        <p>{this.props.product.description}</p>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { products: state.products };
};
let ProductDetails = connect(mapStateToProps)(unconnectedProductDetails);
export default ProductDetails;
