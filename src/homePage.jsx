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

  componentDidMount = () => {
    this.reload();
    this.reloadState();
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
  return { products: state.products };
};
let HomePage = connect(mapStateToProps)(unconnectedHomePage);
export default HomePage;
