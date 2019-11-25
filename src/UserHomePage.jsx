import React, { Component } from "react";
import { connect } from "react-redux";
// import Products from "./Products.jsx";
import { Link } from "react-router-dom";
import DeleteSingle from "./DeleteSingle.jsx";
import Logout from "./Logout.jsx";
import Search from "./Search.jsx";
import Select from "react-select";
import ReviewForm from "./ReviewForm.jsx";
// import Select from "react-styled-select";

const options = [
  { value: "pants", label: "Pants" },
  { value: "shirts", label: "Shirt" },
  { value: "jackets", label: "Jackets" },
  { value: "sweaters", label: "Sweaters" },
  { value: "tops", label: "Tops" },
  { value: "hats", label: "Hats" }
];

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
    let response = await fetch("/product?seller=" + name, { method: "POST" });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("/product response", body);
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
    data.append("productName", this.state.productName);
    data.append("description", this.state.description);
    data.append("size", this.state.size);
    data.append("price", this.state.price);
    data.append("stock", this.state.stock);
    data.append("seller", this.props.username);
    await fetch("/createProduct", { method: "POST", body: data });
    this.setState({ brand: "" });
    this.setState({ productName: "" });
    this.setState({ description: "" });
    this.setState({ size: "" });
    this.setState({ price: "" });
    this.setState({ stock: "" });
    let response = await fetch("/product", { method: "POST" });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("/product response", body);
    this.props.dispatch({ type: "set-products", products: body });

    this.reload();
  };
  render = () => {
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
        <div className="userHp">
          <form onSubmit={this.submitHandler}>
            <label className="inputImage">
              <input type="file" onChange={this.fileChangeHandler} required />
              Image
            </label>
            <Select options={options} className="selectBorderRadius" />

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
          <div className="userHpProducts">
            {this.state.products.map(product => (
              <div key={"f" + product._id}>
                <Link to={"/detail/" + product._id}>
                  <img height="700px" src={product.imgPath} />
                </Link>
                <DeleteSingle reload={this.reload} product={product} />
                {/* <Products key={"q" + product._id} product={product} /> */}
              </div>
            ))}
          </div>
        </div>
        <h2>Write a review</h2>
        <ReviewForm />
      </div>
    );
  };
}

let mapStateToProps = st => {
  return { username: st.username };
};
let UserHomePage = connect(mapStateToProps)(unconnectedUserHomePage);
export default UserHomePage;
