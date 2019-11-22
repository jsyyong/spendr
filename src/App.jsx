import React, { Component } from "react"; // 1
import { connect } from "react-redux";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import UserHomePage from "./UserHomePage.jsx";
import HomePage from "./HomePage.jsx";
import ProductDetails from "./ProductDetails.jsx";
import { Route, BrowserRouter } from "react-router-dom";
import Search from "./Search.jsx";
import SearchResults from "./SearchResults.jsx";
import Seller from "./Seller.jsx";
import Cart from "./Cart.jsx";
import { Link } from "react-router-dom";

class unconnectedApp extends Component {
  // 1
  constructor() {
    // 2
    super(); // 2
    this.state = {
      // 2
      usernameInput: "", // 2
      passwordInput: "", // 2
      username: undefined // 2
    }; // 2
  } // 2
  usernameChange = evt => {
    // 4
    this.setState({ usernameInput: evt.target.value }); // 4
  }; // 4
  passwordChange = evt => {
    // 5
    this.setState({ passwordInput: evt.target.value }); // 5
  }; // 5

  renderCart = () => {
    return <Cart />;
  };
  /*renderItem = async () => {
    let productId = routerData.match.params.pid;
    //console.log("product ID:", productId)
    let products = await fetch("/product", { method: "POST" });
    let body = await products.text();
    body = JSON.parse(body);
    console.log("/product response", body);
    this.setState({ products: body });
    let sortedProducts = this.state.products.map(product => {
      return product.imgPath === productId;
    }); //should only return one object
    return <ProductDetail imgPath={productId} />;
  };*/
  renderSearchResults = () => {
    let flex = { display: "flex" };
    console.log("inside render search results");
    return (
      <div>
        <div className="nav-bar" style={flex}>
          <Search />
          <SignUp />
          <Login />
          <Link to="/cart">Shopping bag</Link>
        </div>
        <SearchResults />
      </div>
    );
  };
  renderSeller = routerData => {
    let sellerId = routerData.match.params.pid;
    let sellerProduct = this.props.products.filter(product => {
      console.log(sellerId);
      return product.seller === sellerId;
    });
    console.log(sellerProduct);
    return (
      <div>
        <Seller sellerId={sellerId} sellerProduct={sellerProduct} />
      </div>
    );
  };
  renderProduct = routerData => {
    let productId = routerData.match.params.pid;
    let product = this.props.products.find(product => {
      return product._id === productId;
    });

    //return product.imgPath;
    return (
      <div>
        <ProductDetails productId={productId} product={product} />
      </div>
    ); //change to be made
  };
  renderHomeScreen = () => {
    let flex = { display: "flex" };
    if (this.props.username === "") {
      return (
        <div>
          <div className="nav-bar" style={flex}>
            <Search />
            <SignUp />
            <Login />
            <Link to="/cart">Shopping bag</Link>
          </div>
          <HomePage />
          <Route exact={true} path="/detail/:pid" render={this.renderProduct} />
          <Route exact={true} path="/detail/:pid" render={this.renderItem} />
          <Route exact={true} path="/cart" render={this.renderCart} />

          <SearchResults />
        </div>
      );
    } else {
      return <UserHomePage username={this.props.username} />;
    }
  };

  // 6
  render = () => {
    return (
      <BrowserRouter>
        <Route exact={true} path="/" render={this.renderHomeScreen} />
        <Route exact={true} path="/detail/:pid" render={this.renderProduct} />
        <Route exact={true} path="/seller/:pid" render={this.renderSeller} />

        <Route exact={true} path="/cart" render={this.renderCart} />

        <Route
          exact={true}
          path="/searchResults"
          render={this.renderSearchResults}
        />
      </BrowserRouter>
    ); // 3
  };
}
let mapStateToProps = st => {
  return {
    username: st.username,
    products: st.products
  };
};
let App = connect(mapStateToProps)(unconnectedApp);
export default App;
