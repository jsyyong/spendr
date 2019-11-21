import React, { Component } from "react";
import { connect } from "react-redux";
import DeleteForm from "./DeleteForm.jsx";
import { Link } from "react-router-dom";

class unconnectedHomePage extends Component {
  reload = async () => {
    //let name = this.state.username;
    let response = await fetch("/product");
    let body = await response.text();
    body = JSON.parse(body);
    console.log("/product response", body);
    this.props.dispatch({ type: "set-products", products: body });
  };
  componentDidMount = () => {
    this.reload();
  };
  render = () => {
    let styleWidth = {
      width: "300px"
    };
    return (
      <div>
        {/* {this.props.products.reverse().map(product => (
          <div key={product._id}>
            <Link to={"/detail/" + product._id}>
              <img style={styleWidth} src={product.imgPath} />
            </Link>
          </div>
        ))} */}
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
