// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";
// 1. 定义动作类型
const ADD = "ADD";
const MINUS = "MINUS";
// 2. 定义actionCreator
function add() {
  return { type: ADD };
}
function minus() {
  return { type: MINUS };
}

function reducer(state = { number: 0 }, action) {
  switch (action.type) {
    case ADD:
      return { number: state.number + 1 };
    case MINUS:
      return { number: state.number - 1 };
    default:
      return state;
  }
}
// const store = createStore(reducer);
const store = configureStore({
  reducer,
  middleware: [thunk, logger],
});
const valElement = document.getElementById("root");
function render() {
  valElement.innerHTML = store.getState().number;
}
render();
store.subscribe(render);

// 绑定事件，派发action
document.getElementById("add").addEventListener("click", () => {
  store.dispatch(add());
});
document.getElementById("minus").addEventListener("click", () => {
  store.dispatch(minus());
});
document.getElementById("async-add").addEventListener("click", () => {
  store.dispatch(() => {
    setTimeout(() => {
      add();
    }, 2000);
  });
});
