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
    let styleWidth = {
      width: "200px"
    };
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
            <button>{this.props.username}</button>
          </div>
        </div>
        <div className="flex-products">
          {this.props.sellerProduct.map(product => (
            <div key={product._id}>
              <Link to={"/detail/" + product._id}>
                <img height="600px" src={product.imgPath} />
              </Link>
              <DeleteSingleProduct product={product} />
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
