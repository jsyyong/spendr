import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class unconnectedPreviewCart extends Component {
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
    let full = this.props.products.length;
    return (
      <div className="containerPreviewCart">
        <div style={{ display: "flex" }} className="flex-products">
          {!this.props.cartItems && <div>Bag is empty :)</div>}
          {this.props.cartItems ? (
            this.props.cartItems.map(product => (
              <div className="eachPreviewCArt" key={product.id}>
                <Link to={"/detail/" + product.id}>
                  <img height="350px" src={product.imgPath} />
                </Link>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    cartItems: state.cartItems,
    sessionId: state.sessionId,
    username: state.username,
    products: state.products
  };
};
let PreviewCart = connect(mapStateToProps)(unconnectedPreviewCart);
export default PreviewCart;
