import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProductDetails from "./ProductDetails.jsx";
import { Route, BrowserRouter } from "react-router-dom";
import Search from "./Search.jsx";
import Logout from "./Logout.jsx";
class unconnectedSeller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [] //the seller's product array
    };
  }

  render = () => {
    console.log(this.props.sellerProduct);
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
        <div className="flex-seller-products">
          {this.props.sellerProduct.map(product => (
            <div key={product._id}>
              <Link to={"/detail/" + product._id}>
                <img height="600px" src={product.imgPath} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };
}

let mapStateToProps = st => {
  return { username: st.username };
};
let Seller = connect(mapStateToProps)(unconnectedSeller);
export default Seller;
