import React, { Component } from "react";
import { connect } from "react-redux";
import Search from "./Search.jsx";
import Logout from "./Logout.jsx";
import DeleteSingleCart from "./DeleteSingleCart.jsx";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

class unconnectedCart extends Component {
  /*reloadCart = async () => {
    let username = this.props.username
    console.log("the username from reloadCart", username)
    let response = await fetch("/cart?username=" + username, { method: "POST" });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("/cart response", body);
    this.props.dispatch({ type: "set-cartItems", cartItems: body });
  };

  componentDidMount = () => {
    this.reloadCart()
  };*/

  // purchaseHandler = () => {
  //   if (this.props.cartItems.length != 0) {
  //     alert("Congratulation! ");
  //   } else {
  //     alert("Sorry. There is no item in the cart.");
  //   }
  // };

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

  reload = async () => {
    //let name = this.state.username;
    let response = await fetch("/product", { method: "POST" });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("/product response", body);
    this.props.dispatch({ type: "set-products", products: body });
  };

  reloadState = async () => {
    let response = await fetch("/check-login", {
      method: "POST",
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("responseBody from login", responseBody);
    let body = JSON.parse(responseBody);
    console.log("parsed body", body);
    if (!body.success) {
      console.log("cookie fail");
      return;
    }
    console.log("cookie dispatchinng");
    this.props.dispatch({
      type: "set-username",
      name: body.username,
      sessionId: body.sessionId,
      loggedIn: false
    });
  };

  reloadCart = async () => {
    let username = this.props.username;
    console.log("the username from reloadCart", username);
    let response = await fetch("/cart?username=" + username, {
      method: "POST"
    });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("/cart response", body);
    this.props.dispatch({ type: "set-cartItems", cartItems: body });
  };

  componentDidMount = async () => {
    this.reload();
    await this.reloadState();
    await this.reloadCart();
  };

  render() {
    console.log("cartItems xoxoxoxoxox======>", this.props.cartItems);

    return (
      <div>
        <div className="nav-bar">
          <Link to="/">
            <button>
              <h1>SPENDR</h1>
            </button>
          </Link>
          <Search />
          <div className="divCart">
            <Link to="/cart">
              <button>Cart</button>
            </Link>
          </div>
          <div className="divSignUpButton">
            <Logout />
          </div>
          <div className="divLoginButton">
            <button>{this.props.username}</button>
          </div>
        </div>
        <div className="flex-products">
          {!this.props.cartItems && <div>Bag is empty :)</div>}
          {this.props.cartItems ? (
            this.props.cartItems.map(product => (
              <div key={"df" + product.id}>
                <Link to={"/detail/" + product.id}>
                  <img height="600px" src={product.imgPath} />
                </Link>
                <p>
                  {product.brand} {product.size} ${product.price}
                </p>

                <DeleteSingleCart
                  product={product}
                  reload={this.reload}
                  reloadCart={this.reloadCart}
                />
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
        <br />
        <StripeCheckout
          name="SPENDR" // the pop-in header title
          description="Big Data Stuff" // the pop-in header subtitle
          image="" // the pop-in header image (default none)
          ComponentClass="div"
          label="Buy the Thing" // text inside the Stripe button
          panelLabel="Give Money" // prepended to the amount in the bottom pay button
          amount={1000000} // cents
          currency="USD"
          stripeKey="pk_test_L4ufjWYDNiycNY8gPs72WO7q00IpViddwi"
          locale="en"
          email="info@vidhub.co"
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
          <button className="productDetailsButtons" onClick={this.onToken}>
            Purchase
          </button>
        </StripeCheckout>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    cartItems: state.cartItems,
    sessionId: state.sessionId,
    username: state.username
  };
};
let Cart = connect(mapStateToProps)(unconnectedCart);
export default Cart;
