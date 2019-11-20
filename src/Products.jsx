import React, { Component } from "react";

class Products extends Component {
  render = () => {
    return <img height="200px" src={this.props.product.imgPath} />;
  };
}

export default Products;
