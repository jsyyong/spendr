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
  return state;
};

let store = createStore(
  reducer,
  { username: "", loggedIn: false, products: [] },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
