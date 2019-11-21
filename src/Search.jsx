import { connect } from "react-redux";
import React, { Component } from "react";
class UnconnectedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: this.props.query
    };
  }
  submitHandler = evt => {
    evt.preventDefault();
    this.props.dispatch({ type: "query", q: this.state.searchInput });
  };
  onChangeHandler = evt => {
    this.setState({ searchInput: evt.target.value });
  };

  render = () => {
    return (
      <div>
        Search
        <input
          type="text"
          placeholder="Search"
          onChange={this.onChangeHandler}
          value={this.state.searchInput}
        />
        <button onClick={this.submitHandler}>Go</button>
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
