import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class unconnectedProductDetails extends Component {
  // purchaseHandler()
  cartHandler = () => {
    this.props.dispatch({
      type: "add-cart",
      data: this.props.product
    });
  };
  // messageHandler()

  render() {
    return (
      <div className="ProductDetails">
        <div className="ProductDetailsImg">
          <img height="1200px" src={this.props.product.imgPath} />
        </div>
        <div className="ProductDetailsInfo">
          <h2>{this.props.product.brand}</h2>
          <h4>{this.props.product.productName}</h4>
          <p>{this.props.product.description}</p>
          <p>{"Size: " + this.props.product.size}</p>
          <p>{"$" + this.props.product.price}</p>
          <p>{this.props.product.stock} left in stock</p>
          <div>
            <button
              className="productDetailsButtons"
              onClick={this.purchaseHandler}
            >
              Purchase
            </button>
            <br />
            <button
              className="productDetailsButtons"
              onClick={this.cartHandler}
            >
              Add to cart
            </button>
            {/* <button onClick={this.messageHandler}>Message to Seller</button> */}
            <br />

            <Link to="/cart">
              <button className="productDetailsButtons">Shopping bag</button>{" "}
            </Link>
            <br />
            <Link to={"/seller/" + this.props.product.seller}>
              <button className="productDetailsButtons">
                Listed by{" " + this.props.product.seller}
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { products: state.products };
};
let ProductDetails = connect(mapStateToProps)(unconnectedProductDetails);
export default ProductDetails;
