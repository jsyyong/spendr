import { connect } from "react-redux";
import React, { Component } from "react";
class UnconnectedSearchResults extends Component {
  handleResults = async () => {
    let response = await fetch(
      "/searchResults?description=" + this.props.query
    );
    let body = await response.json();
    console.log("handle results body", body);
    if (body.length !== this.props.searchResults.length) {
      this.props.dispatch({ type: "set-searchResults", searchResults: body });
    }
  };
  componentDidMount = () => {
    this.handleResults();
  };
  componentDidUpdate = () => {
    this.handleResults();
  };
  render = () => {
    console.log("inside render searchResults", this.props.searchResults);
    return this.props.searchResults.map(result => {
      return <div key={result._id}>{result.description}</div>;
    });
  };
}

let mapStateToProps = st => {
  console.log("st search query", st.searchQuery);
  return {
    query: st.searchQuery,
    searchResults: st.searchResults
  };
};

let SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);
export default SearchResults;
