import React, { Component } from "react";
import { connect } from "react-redux";

class unconnectedHomePage extends Component {
  render = () => {};
}
let mapStateToProps = st => {
  return {};
};
let homePage = connect(mapStateToProps)(unconnectedHomePage);
export default homePage;
