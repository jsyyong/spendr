import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "set-username") {
    return { ...state, username: action.name, loggedIn: action.loggedIn, sessionId: action.sessionId };
  }
  if (action.type === "add-cart") {
    let cartItems = state.cartItems
      ? [...state.cartItems, action.data]
      : [action.data];

    return { ...state, cartItems };
  }
  if (action.type === "signin") {
    return { ...state, username: action.username };
  }
  if (action.type === "set-products") {
    return { ...state, products: action.products };
  }
  if (action.type === "set-cartItems") {
    return { ...state, cartItems: action.cartItems };
  }
  if (action.type === "query") {
    return { ...state, searchQuery: action.q };
  }
  if (action.type === "set-searchResults") {
    return { ...state, searchResults: action.searchResults };
  }
  if (action.type === "logout") {
    return { ...state, username: "", sessionId: ""};
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
    products: [],
    cartItems: [],
    sessionId: ""
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
