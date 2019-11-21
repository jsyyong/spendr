import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "set-username") {
    return { ...state, username: action.name, loggedIn: true };
  }
  if (action.type === "signin") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "set-products") {
    return { ...state, products: action.products };
  }
  if (action.type === "query") {
    return { ...state, searchQuery: action.q };
  }
  if (action.type === "set-searchResults") {
    return { ...state, searchResults: action.searchResults };
  }
  return state;
};

let store = createStore(
  reducer,
  {
    searchQuery: "",
    username: "",
    loggedIn: false,
    searchResults: [],
    products: []
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
