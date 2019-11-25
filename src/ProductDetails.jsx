import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class unconnectedProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product
    };
  }
  purchaseHandler = () => {
    alert("Congratulation! now " + this.props.product.brand + " is yours!");
  };
  cartHandler = async event => {
    let sessionId = this.props.sessionId;
    console.log("current sessionnId", sessionId);
    let productObject = this.props.product;
    console.log("creating a new key in productObject");
    productObject.sessionId = sessionId;
    console.log("productObject.sessionId:", productObject);
    let data = new FormData();
    data.append("sessionId", productObject.sessionId);
    data.append("brand", productObject.brand);
    data.append("description", productObject.description);
    data.append("imgPath", productObject.imgPath);
    data.append("price", productObject.price);
    data.append("productName", productObject.productName);
    data.append("seller", productObject.seller);
    data.append("size", productObject.size);
    data.append("username", this.props.username);
    data.append("stock", productObject.stock);
    data.append("id", productObject._id);
    event.preventDefault();
    let response = await fetch("/addToCart", {
      method: "POST",
      body: data
    });
    let body = await response.json();
    console.log("cartHandler body", body);
    //////
    if (!body.success) {
      console.log("error adding to cart :(");
      return;
    }
    console.log("cart add success! sending dispatch");
    if (this.props.product.stock === 0) {
      alert("SOLD OUT");
    } else {
      alert(
        this.props.product.brand +
          this.props.product.productName +
          " is added to your shopping bag"
      );
    }
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
  return {
    products: state.products,
    sessionId: state.sessionId,
    username: state.username
  };
};
let ProductDetails = connect(mapStateToProps)(unconnectedProductDetails);
export default ProductDetails;
