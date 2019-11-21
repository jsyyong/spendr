import { connect } from "react-redux";
import React, { Component } from "react";
class UnconnectedSearchResults extends Component {
  render = () => {
    return "hello";
  };
}

let mapStateToProps = st => {
  return {
    query: st.searchQuery
  };
};

let SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);
export default SearchResults;
