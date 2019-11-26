import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProductDetails from "./ProductDetails.jsx";
import { Route, BrowserRouter } from "react-router-dom";
import Search from "./Search.jsx";
import Logout from "./Logout.jsx";
import DeleteSingleProduct from "./DeleteSingleProduct.jsx";
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
            <Link to="/signUpLogin">
              <button className="loginButton">{this.props.username}</button>
            </Link>
          </div>
        </div>
        <div className="containerSeller">
          <h2 className="user">{this.props.seller + "*****"}</h2>
          <h2 className="search">Search</h2>
          <h2 className="sort">Sort</h2>
          <h2 className="msg">Message Seller</h2>

          <div className="flex-products">
            {this.props.sellerProduct.map(product => (
              <div>
                <div className="eachProductSeller" key={product._id}>
                  <Link to={"/detail/" + product._id}>
                    <img height="600px" src={product.imgPath} />
                  </Link>
                </div>
                <DeleteSingleProduct product={this.state.product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
}

let mapStateToProps = st => {
  return { username: st.username, seller: st.seller };
};
let Seller = connect(mapStateToProps)(unconnectedSeller);
export default Seller;
