import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProductDetails from "./ProductDetails.jsx";
import { Route, BrowserRouter } from "react-router-dom";
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
        <p>{this.props.sellerId}</p>
        {this.props.sellerProduct.map(product => (
          <div key={product._id}>
            <Link to={"/detail/" + product._id}>
              <img height="600px" src={product.imgPath} />
            </Link>
          </div>
        ))}
      </div>
    );
  };
}

let mapStateToProps = st => {
  return {};
};
let Seller = connect(mapStateToProps)(unconnectedSeller);
export default Seller;
