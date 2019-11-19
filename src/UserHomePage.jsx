import React, { Component } from "react";
import { connect } from "react-redux";

class unconnectedUserHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      posts: [],
      file: "",
      brand: "brand",
      description: "description",
      size: "size",
      price: "price",
      stock: "stock"
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
    let response = await fetch("/image-userPage?username=" + name);
    let body = await response.text();
    body = JSON.parse(body);
    console.log("/image-userPage response", body);
    this.setState({ posts: body });
  };
  componentDidMount = () => {
    this.reload();
  };
  submitHandler = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("img", this.state.file);
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
    return (
      <div>
        <form className="userInput" onSubmit={this.submitHandler}>
          <input type="file" onChange={this.fileChangeHandler} required />
          <input
            type="text"
            value={this.state.brand}
            onChange={this.brandChangeHandler}
            required
          />
          <input
            type="text"
            value={this.state.description}
            onChange={this.descChangeHandler}
            required
          />
          <input
            type="text"
            value={this.state.size}
            onChange={this.sizeChangeHandler}
            required
          />
          <input
            type="text"
            value={this.state.price}
            onChange={this.priceChangeHandler}
            required
          />
          <input
            type="text"
            value={this.state.stock}
            onChange={this.stockChangeHandler}
            required
          />
          <input type="submit" value="upload" />
        </form>
        <div>
          {this.state.posts.reverse().map(product => (
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
