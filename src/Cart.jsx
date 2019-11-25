import React, { Component } from "react";
import { connect } from "react-redux";
import Search from "./Search.jsx";
import Logout from "./Logout.jsx";
import DeleteSingleCart from "./DeleteSingleCart.jsx";
import { Link } from "react-router-dom";

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
    console.log("cartItems", this.props.cartItems);
    return (
      <div>
        <div className="nav-bar">
          <h1>SPENDR</h1>
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
        <ul>
          {!this.props.cartItems && <div>Bag is empty :)</div>}
          {this.props.cartItems ? (
            this.props.cartItems.map(product => (
              <div>
                <Link to={"/detail/" + product.id}>
                  <img height="600px" src={product.imgPath} />
                </Link>
                <li>
                  {product.brand} {product.size} ${product.price}{" "}
                  {
                    <DeleteSingleCart
                      product={product}
                      reload={this.reload}
                      reloadCart={this.reloadCart}
                    />
                  }
                </li>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </ul>
        <br />
        <button onClick={this.purchaseHandler}>Purchase</button>
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
