import React, { Component } from "react";
import { connect } from "react-redux";
import DeleteForm from "./DeleteForm.jsx";
import { Link } from "react-router-dom";

class unconnectedHomePage extends Component {
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
  render = () => {
    return (
      <div className="hpProducts">
        {this.props.products.reverse().map(product => (
          <div key={"f" + product._id}>
            <Link to={"/detail/" + product._id}>
              <img height="600px" src={product.imgPath} />
            </Link>
          </div>
        ))}
        <DeleteForm reload={this.reload} />
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { products: state.products, username: state.username };
};
let HomePage = connect(mapStateToProps)(unconnectedHomePage);
export default HomePage;
