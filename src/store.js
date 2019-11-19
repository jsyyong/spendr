import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "set-username") {
    return { ...state, username: action.name };
  }
  if (action.type === "signin") {
    return { ...state, loggedIn: true };
  }
  return state;
};

let store = createStore(
  reducer,
  { username: "", loggedIn: false },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
