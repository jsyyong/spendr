import React, { Component } from "react";
import { connect } from "react-redux";

class unconnectedCart extends Component {
  purchaseHandler = () => {
    alert("Congratulation!");
  };
  render() {
    console.log(this.props.cartItems);
    return (
      <div>
        <h1>Shopping Bag</h1>
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
        <br />
        <button onClick={this.purchaseHandler}>Purchase</button>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { cartItems: state.cartItems };
};
let Cart = connect(mapStateToProps)(unconnectedCart);
export default Cart;
