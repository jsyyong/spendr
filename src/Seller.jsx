import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProductDetails from "./ProductDetails.jsx";
import { Route, BrowserRouter } from "react-router-dom";
class unconnectedSeller extends Component {
  constructor() {
    super();
    this.state = {
      product: [], //the seller's product array
      seller: this.props.seller
    };
  }

  reload = async () => {
    let seller = this.state.seller;
    let response = await fetch("/product?seller=" + seller);
    let body = await response.text();
    body = JSON.parse(body);
    // console.log("/product response", body);
    this.setState({ products: body.reverse() });
  };
  componentDidMount = () => {
    this.reload();
  };

  render = () => {
    let styleWidth = {
      width: "200px"
    };
    return (
      <div>
        <h2>{this.state.seller}</h2>
        {this.state.product.reverse().map(product => (
          <div key={product._id}>
            <Link to={"/detail/" + product._id}>
              <img style={styleWidth} src={product.imgPath} />
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
