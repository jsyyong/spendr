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
    alert(
      this.props.product.brand +
        this.props.product.productName +
        " is added to your shopping bag"
    );
  };
  // messageHandler()

  render() {
    return (
      <div className="ProductDetails">
        <div>
          <img height="1200px" src={this.props.product.imgPath} />
        </div>
        <div className="ProductDetailsInfo">
          <h2>{this.props.product.brand}</h2>
          <h4>{this.props.product.productName}</h4>

          <p>{this.props.product.description}</p>
          <p>Size: {this.props.product.size}</p>
          <p>Price: {"$" + this.props.product.price}</p>
          <p
            style={
              this.props.product.stock < 10
                ? { color: "red" }
                : { color: "green" }
            }
          >
            {this.props.product.stock} left in stock
          </p>
          <br />
          <p>
            Listed by:
            <Link to={"/seller/" + this.props.product.seller}>
              {this.props.product.seller}
            </Link>
          </p>

          <br />
          <button onClick={this.purchaseHandler}>Purchase</button>

          <br />
          <button onClick={this.cartHandler}>Add to cart</button>
          <br />
          {/* <button onClick={this.messageHandler}>Message to Seller</button> */}

          <Link to="/cart">Shopping bag </Link>
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
