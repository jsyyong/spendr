import React, { Component } from "react";
import { connect } from "react-redux";
import Products from "./Products.jsx";

class unconnectedUserHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      products: [],
      file: "",
      category: "Category",
      brand: "",
      productName: "",
      description: "",
      size: "",
      price: "",
      stock: ""
    };
  }

  fileChangeHandler = e => {
    this.setState({ file: e.target.files[0] });
  };

  onChangeHandler = field => {
    return event => {
      this.setState({ [field]: event.target.value });
    };
  };

  reload = async () => {
    let name = this.state.username;
    let response = await fetch("/product?seller=" + name);
    let body = await response.text();
    body = JSON.parse(body);
    // console.log("/product response", body);
    this.setState({ products: body.reverse() });
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
    data.append("product name", this.state.productName);
    data.append("description", this.state.description);
    data.append("size", this.state.size);
    data.append("price", this.state.price);
    data.append("stock", this.state.stock);
    data.append("seller", this.props.username);
    await fetch("/createItem", { method: "POST", body: data });
    this.setState({ brand: "" });
    this.setState({ productName: "" });
    this.setState({ description: "" });
    this.setState({ size: "" });
    this.setState({ price: "" });
    this.setState({ stock: "" });
    this.reload();
  };
  render = () => {
    let styleWidth = {
      width: "200px"
    };
    return (
      <div>
        username: {this.props.username}
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
            value={this.state.brand}
            placeholder="Brand"
            onChange={this.onChangeHandler("brand")}
            required
          />
          <input
            className="userInput"
            type="text"
            value={this.state.productName}
            placeholder="Product Name"
            onChange={this.onChangeHandler("productName")}
            required
          />
          <input
            className="userInput"
            type="text"
            value={this.state.description}
            placeholder="Description"
            onChange={this.onChangeHandler("description")}
            required
          />
          <input
            className="userInput"
            type="text"
            value={this.state.size}
            placeholder="Size"
            onChange={this.onChangeHandler("size")}
            required
          />
          <input
            className="userInput"
            type="text"
            value={this.state.price}
            placeholder="Price"
            onChange={this.onChangeHandler("price")}
            required
          />
          <input
            className="userInput"
            type="text"
            value={this.state.stock}
            placeholder="Stock"
            onChange={this.onChangeHandler("stock")}
            required
          />
          <input className="userInput" type="submit" value="Upload" />
        </form>
        <div>
          {this.state.products.map(product => (
            <Products key={product._id} product={product} />
          ))}
        </div>
      </div>
    );
  };
}
let mapStateToProps = st => {
  return { username: st.username };
};
let UserHomePage = connect(mapStateToProps)(unconnectedUserHomePage);
export default UserHomePage;
