import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReviewForm from "./ReviewForm.jsx";
import ReviewMessages from "./ReviewMessages.jsx";
import StripeCheckout from "react-stripe-checkout";
import LinkToSeller from "./LinkToSeller.jsx";

class unconnectedProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      productId: this.props.productId,
      seller: this.props.product.seller
    };
  }
  purchaseHandler = () => {
    if (this.props.product.stock === 0) {
      alert("Sorry, this item is currently out of stock");
    } else {
      let data = this.props.product;
      this.props.dispatch({ type: "add-cart", data });

      alert("Congratulation! now " + this.props.product.brand + " is yours!");
    }
  };

  onToken = token => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
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
      let data = this.props.product;
      this.props.dispatch({ type: "add-cart", data });
      console.log(data);
      alert(
        data.brand + " " + data.productName + " is added to your shopping bag"
      );
    }
  };
  // messageHandler()

  render() {
    return (
      <div>
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
              <StripeCheckout
                name="SPENDR" // the pop-in header title
                description="" // the pop-in header subtitle
                image="" // the pop-in header image (default none)
                ComponentClass="div"
                label="Buy the Thing" // text inside the Stripe button
                panelLabel="Spend Money" // prepended to the amount in the bottom pay button
                amount={1000000} // cents
                currency="USD"
                stripeKey="pk_test_L4ufjWYDNiycNY8gPs72WO7q00IpViddwi"
                locale="en"
                email="info@spendr.ca"
                // Note: Enabling either address option will give the user the ability to
                // fill out both. Addresses are sent as a second parameter in the token callback.
                shippingAddress
                billingAddress={false}
                // Note: enabling both zipCode checks and billing or shipping address will
                // cause zipCheck to be pulled from billing address (set to shipping if none provided).
                zipCode={false}
                alipay // accept Alipay (default false)
                bitcoin // accept Bitcoins (default false)
                allowRememberMe // "Remember Me" option (default true)
                token={this.onToken} // submit callback
                opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
                closed={this.onClosed} // called when the checkout popin is closed (no IE6/7)
                // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
                // you are using multiple stripe keys
                reconfigureOnUpdate={false}
                // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
                // useful if you're using React-Tap-Event-Plugin
              >
                <button
                  className="productDetailsButtons"
                  onClick={this.onToken}
                >
                  Purchase
                </button>
              </StripeCheckout>
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
              <LinkToSeller seller={this.state.seller} />
              {/*<Link to={"/seller/" + this.props.product.seller}>
                <button className="productDetailsButtons">
                  Listed by{" " + this.props.product.seller}
                </button>
              </Link>*/}
            </div>
          </div>
        </div>
        <h2>User Reviews</h2>
        <ReviewMessages productId={this.state.productId} />
        <h2>Write a review</h2>
        <ReviewForm productId={this.state.productId} />
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
