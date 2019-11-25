import React, { Component } from "react"; // 1
import { connect } from "react-redux";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import UserHomePage from "./UserHomePage.jsx";
import HomePage from "./HomePage.jsx";
import ProductDetails from "./ProductDetails.jsx";
import { Route, BrowserRouter } from "react-router-dom";
import Search from "./Search.jsx";
import { Link } from "react-router-dom";
import SignUpLogin from "./SignUpLogin.jsx";
import SearchResults from "./SearchResults.jsx";
import Seller from "./Seller.jsx";
import Cart from "./Cart.jsx";

class unconnectedApp extends Component {
  loginOrWelcome = () => {
    console.log("current user", this.props.username);
    if (this.props.username === "") {
      return (
        <Link to="/signUpLogin">
          <button className="loginButton">Login</button>
        </Link>
      );
    }
    return (
      <div>
        <Link to="/signUpLogin">
          <button className="loginButton">{this.props.username}</button>
        </Link>
      </div>
    );
  };
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

  renderSignUpLogin = () => {
    return <SignUpLogin />;
  };
  renderSearchResults = () => {
    console.log("inside render search results");
    if (/*this.props.username === "" && */ this.props.loggedIn === false) {
      return (
        <div>
          <div className="nav-bar">
            <Link to="/">
              <button>
                <h1>SPENDR</h1>
              </button>
            </Link>
            <Search />
            <div className="divSignUpButton">
              <Link to="/signUpLogin">
                <button className="signUpButton">SignUp</button>
              </Link>
            </div>
            <div className="divLoginButton">
              {this.loginOrWelcome()}
              {/*<Link to="/signUpLogin">
                <button className="loginButton">Login</button>
      </Link>*/}
            </div>
          </div>
          <SearchResults />
        </div>
      );
    } else {
      return <UserHomePage username={this.props.username} />;
    }
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
    return (
      <div>
        <div className="nav-bar">
          <Link to="/">
            <button>
              <h1>SPENDR</h1>
            </button>
          </Link>
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
        <div>
          <ProductDetails productId={productId} product={product} />
        </div>
      </div>
    );
  };
  renderHomeScreen = () => {
    if (/*this.props.username === "" && */ this.props.loggedIn === false) {
      return (
        <div>
          <div className="nav-bar">
            <Link to="/">
              <button>
                <h1>SPENDR</h1>
              </button>
            </Link>
            <Search />
            <div className="divCart">
              <Link to="/cart">
                <button>Cart</button>
              </Link>
            </div>
            <div className="divSignUpButton">
              <Link to="/signUpLogin">
                <button>SignUp</button>
              </Link>
            </div>
            <div className="divLoginButton">
              {this.loginOrWelcome()}
              {/*<Link to="/signUpLogin">
                <button className="loginButton">Login</button>
      </Link>*/}
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
        <Route exact={true} path="/seller/:pid" render={this.renderSeller} />

        <Route exact={true} path="/cart" render={this.renderCart} />

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
    products: st.products,
    loggedIn: st.loggedIn
  };
};
let App = connect(mapStateToProps)(unconnectedApp);
export default App;
