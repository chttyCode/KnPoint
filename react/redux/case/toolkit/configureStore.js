import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) return false;
  //let obj = new Object(); let obj = {}
  return Object.getPrototypeOf(value) === Object.prototype;
}
function configureStore(options = {}) {
  let { reducer, middleware = [thunk], preloadedState } = options;
  let rootReducer;
  if (typeof reducer === "function") {
    rootReducer = reducer;
  } else if (isPlainObject(reducer)) {
    rootReducer = combineReducers(reducer);
  }
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware))
  );
}
export default configureStore;
