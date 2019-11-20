import React, { Component } from "react";
import { connect } from "react-redux";
import DeleteForm from "./DeleteForm.jsx";

class unconnectedHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }
  reload = async () => {
    //let name = this.state.username;
    let response = await fetch("/product", { method: "GET" });
    let body = await response.text();
    body = JSON.parse(body);
    // console.log("/product response", body);
    this.setState({ products: body });
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
        {this.state.products.reverse().map(product => (
          <div key={product._id}>
            <img style={styleWidth} src={product.imgPath} />
          </div>
        ))}
        <DeleteForm reload={this.reload} />
      </div>
    );
  };
}
let mapStateToProps = st => {
  return {};
};
let HomePage = connect(mapStateToProps)(unconnectedHomePage);
export default HomePage;
