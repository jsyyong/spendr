import React, { Component } from "react";
import { connect } from "react-redux";

class unconnectedUserHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      products: [],
      file: "",
      category: "category",
      brand: "Brand",
      description: "Description",
      size: "Size",
      price: "Price",
      stock: "Stock"
    };
  }
  fileChangeHandler = e => {
    this.setState({ file: e.target.files[0] });
  };
  brandChangeHandler = e => {
    this.setState({ brand: e.target.value });
  };
  descChangeHandler = e => {
    this.setState({ description: e.target.value });
  };
  sizeChangeHandler = e => {
    this.setState({ size: e.target.value });
  };
  priceChangeHandler = e => {
    this.setState({ price: e.target.value });
  };
  stockChangeHandler = e => {
    this.setState({ stock: e.target.value });
  };

  reload = async () => {
    let name = this.state.username;
    let response = await fetch("/product?username=" + name);
    let body = await response.text();
    body = JSON.parse(body);
    console.log("/image-userPage response", body);
    this.setState({ products: body });
  };
  componentDidMount = () => {
    this.reload();
  };
  submitHandler = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("img", this.state.file);
    data.append("category", this.state.category);
    data.append("brand", this.state.brand);
    data.append("description", this.state.description);
    data.append("size", this.state.size);
    data.append("price", this.state.price);
    data.append("stock", this.state.stock);
    data.append("seller", this.props.username);
    await fetch("/createItem", { method: "POST", body: data });
    this.reload();
  };
  render = () => {
    let styleWidth = {
      width: "200px"
    };
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <label className="inputImage">
            <input type="file" onChange={this.fileChangeHandler} required />
            Image
          </label>
          <div className="custom-select" style={styleWidth}>
            <select>
              <option value="pants">Pants</option>
              <option value="shirts">Shirt</option>
              <option value="jackets">Jackets</option>
              <option value="sweaters">Sweaters</option>
              <option value="t-shirts">T-shirt</option>
              <option value="shoes">Shoes</option>
              <option value="hats">Hats</option>
            </select>
          </div>

          <input
            className="userInput"
            type="text"
            placeholder={this.state.brand}
            onChange={this.brandChangeHandler}
            required
          />
          <input
            className="userInput"
            type="text"
            placeholder={this.state.description}
            onChange={this.descChangeHandler}
            required
          />
          <input
            className="userInput"
            type="text"
            placeholder={this.state.size}
            onChange={this.sizeChangeHandler}
            required
          />
          <input
            className="userInput"
            type="text"
            placeholder={this.state.price}
            onChange={this.priceChangeHandler}
            required
          />
          <input
            className="userInput"
            type="text"
            placeholder={this.state.stock}
            onChange={this.stockChangeHandler}
            required
          />
          <input className="userInput" type="submit" value="Upload" />
        </form>
        <div>
          {this.state.products.reverse().map(product => (
            <div key={product._id}>{product.description}</div>
          ))}
        </div>
      </div>
    );
  };
}
let mapStateToProps = st => {
  return {};
};
let UserHomePage = connect(mapStateToProps)(unconnectedUserHomePage);
export default UserHomePage;
