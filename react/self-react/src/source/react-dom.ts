import { REACT_TEXT } from "./constants";
import { addEvent } from "./event";

function render(vDom, container) {
  mount(vDom, container);
}
function mount(vDom, container) {
  let newDOM = createDom(vDom);
  container.appendChild(newDOM);
}
export function createDom(vDom) {
  const { type, props, ref } = vDom;
  let dom;
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props.content);
  } else if (typeof type === "function") {
    if (type.isClassComponent) {
      return mountClassComponent(vDom);
    } else {
      return mountFunctionComponent(vDom, props);
    }
  } else {
    dom = document.createElement(type);
  }
  if (props) {
    updateProps(dom, props);
  }
  vDom.dom = dom;
  return dom;
}
function mountFunctionComponent(vDom, props) {
  const { type } = vDom;
  const oldRenderVDom = type(props);
  vDom.oldRenderVDom = oldRenderVDom;
  return createDom(oldRenderVDom);
}
function mountClassComponent(vDom) {
  // 解构类的定义和类的属性对象
  let { type, props, ref } = vDom;
  //创建类的实例
  let classInstance = new type(props);
  if (ref) classInstance.ref = ref; //如果虚拟DOm身上有REF属性，那么就赋给类的实例
  if (type.contextType) {
    classInstance.context = type.contextType.Provider._value;
  }
  //让这个类组件的虚拟DOM的classInstance属性指向这个类组件的实例
  vDom.classInstance = classInstance;
  //调用实例的render方法返回要渲染的虚拟DOM对象
  let oldRenderVDom = classInstance.render();
  //把这个将要渲染的虚拟dom添加到类的实例上
  classInstance.oldRenderVDom = vDom.oldRenderVDom = oldRenderVDom;
  //根据虚拟DOM对象创建真实DOM对象
  let dom = createDom(oldRenderVDom);
  if (classInstance.componentDidMount) {
    classInstance.componentDidMount();
    // dom.componentDidMount=classInstance.componentDidMount.bind(classInstance);
  }

  return dom;
}
export function updateProps(dom, props) {
  for (let key in props) {
    if (key === "children") {
      if (Array.isArray(props.children)) {
        props.children.forEach((child) => {
          mount(child, dom);
        });
      } else {
        mount(props.children, dom);
      }
    } else if (key === "style") {
      let styleObj = props.style;
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else if (key.startsWith("on")) {
      addEvent(dom, key.toLocaleLowerCase(), props[key]);
    } else {
      //在JS中 dom.className='title'
      dom[key] = props[key];
    }
  }
}

const ReactDOM = { render };

export default ReactDOM;
