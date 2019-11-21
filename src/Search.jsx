import { connect } from "react-redux";
import React, { Component } from "react";
class UnconnectedSearch extends Component {
  handleQuery = evt => {
    this.props.dispatch({ type: "query", q: evt.target.value });
  };

  render = () => {
    return (
      <div>
        Search
        <input
          type="text"
          onChange={this.handleQuery}
          placeholder="Search"
          value={this.props.query}
        />
      </div>
    );
  };
}

let mapStateToProps = st => {
  return {
    query: st.searchQuery
  };
};
let Search = connect(mapStateToProps)(UnconnectedSearch);
export default Search;
