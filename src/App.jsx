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
import { Link } from "react-router-dom";
import SignUpLogin from "./SignUpLogin.jsx";

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
  renderSignUpLogin = () => {
    return <SignUpLogin />;
  };
  renderSearchResults = () => {
    console.log("inside render search results");
    return (
      <div>
        <div className="nav-bar">
          <Search />
          <SignUp />
          <Login />
        </div>
        <SearchResults />
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
    if (this.props.username === "") {
      return (
        <div>
          <div className="nav-bar">
            <h1>SPENDR</h1>
            <Search />
            <div className="divSignUpButton">
              <Link to="/signUpLogin">
                <button className="signUpButton">SignUp</button>
              </Link>
            </div>
            <div className="divLoginButton">
            <Link to="/signUpLogin">
              <button className="loginButton">Login</button>
            </Link>
            </div>
          </div>
          <HomePage />
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
        <Route
          exact={true}
          path="/searchResults"
          render={this.renderSearchResults}
        />
        <Route
          exact={true}
          path="/signUpLogin"
          render={this.renderSignUpLogin}
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
