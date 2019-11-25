import React, { Component } from "react";
import { connect } from "react-redux";
import Search from "./Search.jsx";
import Logout from "./Logout.jsx";
import { Link } from "react-router-dom";

class unconnectedCart extends Component {
  render() {
    console.log(this.props.cartItems);
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
              <li>
                {product.brand} {product.size} ${product.price}
              </li>
            ))
          ) : (
            <div></div>
          )}
        </ul>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { cartItems: state.cartItems };
};
let Cart = connect(mapStateToProps)(unconnectedCart);
export default Cart;
