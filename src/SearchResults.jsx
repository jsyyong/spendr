import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
class UnconnectedSearchResults extends Component {
  handleResults = async () => {
    let response = await fetch(
      "/searchResults?description=" + this.props.query
    );
    let body = await response.json();
    console.log("handle results body", body);
    this.props.dispatch({ type: "set-searchResults", searchResults: body });
  };
  componentDidMount = () => {
    this.handleResults();
  };
  componentDidUpdate = prevProps => {
    if (this.props.query !== prevProps.query) {
      this.handleResults();
    }
  };
  render = () => {
    console.log("inside render searchResults", this.props.searchResults);
    return this.props.searchResults.map(result => {
      return (
        <div key={result._id}>
          <Link to={"/detail/" + result._id}>
            <img height="200px" key={"i" + result._id} src={result.imgPath} />
          </Link>
          <div key={"d" + result._id}>{result.price}</div>
        </div>
      );
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
