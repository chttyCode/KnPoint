import { REACT_TEXT } from "./constants";
import { Component } from "./component";
function createElement(type, config, children) {
  let ref;
  let key;
  if (config) {
    delete config.__source;
    delete config.__self;
    ref = config.ref;
    delete config.ref;
    key = config.key;
    delete config.key;
  }
  let props = { ...config };
  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVDom);
  } else {
    props.children = wrapToVDom(children);
  }
  return {
    type,
    ref,
    key,
    props,
  };
}

function wrapToVDom(element) {
  return typeof element === "string" || typeof element === "number"
    ? { type: REACT_TEXT, props: { content: element } }
    : element;
}
const React = {
  createElement,
  Component,
};

export default React;
