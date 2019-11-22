import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class unconnectedProductDetails extends Component {
  purchaseHandler = () => {
    alert("Congratulation! now " + this.props.product.brand + " is yours!");
  };
  cartHandler = () => {
    this.props.dispatch({
      type: "add-cart",
      data: this.props.product
    });
  };
  // messageHandler()

  render() {
    return (
      <div>
        <img height="800px" width="350px" src={this.props.product.imgPath} />
        <h2>{this.props.product.brand}</h2>
        <p>{this.props.product.description}</p>
        <p>Size: {this.props.product.size}</p>
        <p>Price: ${this.props.product.price}</p>
        <p
          style={
            this.props.product.stock < 10
              ? { color: "red" }
              : { color: "green" }
          }
        >
          {this.props.product.stock} left in stock
        </p>
        <p>
          {" "}
          Seller:
          <Link to={"/seller/" + this.props.product.seller}>
            {" "}
            {this.props.product.seller}
          </Link>
        </p>
        <button onClick={this.purchaseHandler}>Purchase</button>
        <button onClick={this.cartHandler}>Add to cart</button>
        {/* <button onClick={this.messageHandler}>Message to Seller</button> */}

        <Link to="/cart">Shopping bag </Link>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { products: state.products };
};
let ProductDetails = connect(mapStateToProps)(unconnectedProductDetails);
export default ProductDetails;
