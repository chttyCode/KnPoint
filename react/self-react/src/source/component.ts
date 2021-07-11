import { createDom, updateProps } from "./react-dom";
import { REACT_TEXT } from "./constants";
// 更新队列
export let updateQueue = {
  isBatchingUpdate: false, //当前是否处于批量更新模式,默认值是false
  updaters: [],
  batchUpdate() {
    //批量更新
    for (let updater of updateQueue.updaters) {
      updater.updateComponent();
    }
    updateQueue.isBatchingUpdate = false;
    updateQueue.updaters.length = 0;
  },
};

class Updater {
  classInstance: any;
  pendingStates: any[];
  callbacks: any[];
  nextProps: any;
  constructor(classInstance) {
    this.classInstance = classInstance; //类组件的实例
    this.pendingStates = []; //等待生效的状态,可能是一个对象，也可能是一个函数
    this.callbacks = [];
  }
  addState(partialState, callback) {
    this.pendingStates.push(partialState); ///等待更新的或者说等待生效的状态
    if (typeof callback === "function") this.callbacks.push(callback); //状态更新后的回调
    this.emitUpdate();
  }
  emitUpdate(nextProps?) {
    this.nextProps = nextProps;
    if (updateQueue.isBatchingUpdate) {
      //如果当前的批量模式。先缓存updater
      updateQueue.updaters.push(this); //本次setState调用结束
    } else {
      this.updateComponent(); //直接更新组件
    }
  }
  updateComponent() {
    let { classInstance, pendingStates, nextProps } = this;
    // 如果有等待更新的状态对象的话
    if (nextProps || pendingStates.length > 0) {
      shouldUpdate(classInstance, nextProps, this.getState(nextProps));
    }
  }
  getState(nextProps) {
    //如何计算最新的状态
    let { classInstance, pendingStates } = this;
    let { state } = classInstance;
    pendingStates.forEach((nextState) => {
      //如果pendingState是一个函数的话，传入老状态，返回新状态，再进行合并
      if (typeof nextState === "function") {
        nextState = nextState(state);
      }
      state = { ...state, ...nextState };
    });
    pendingStates.length = 0; //清空数组
    if (classInstance.constructor.getDerivedStateFromProps) {
      let partialState = classInstance.constructor.getDerivedStateFromProps(
        nextProps,
        classInstance.state
      );
      if (partialState) {
        state = { ...state, ...partialState };
      }
    }
    return state;
  }
}
function shouldUpdate(classInstance, nextProps, nextState) {
  let willUpdate = true; //是否要更新
  //如果有shouldComponentUpdate方法，并且它的返回值为false的话，那就不更新
  if (
    classInstance.shouldComponentUpdate &&
    !classInstance.shouldComponentUpdate(nextProps, nextState)
  ) {
    willUpdate = false;
  }
  if (willUpdate && classInstance.componentWillUpdate) {
    classInstance.componentWillUpdate();
  }
  //不管要不要更新，新的属性和状态对象都得改了
  if (nextProps) {
    classInstance.props = nextProps;
  }

  classInstance.state = nextState;
  /*  if(classInstance.constructor.contextType){
        classInstance.context = classInstance.constructor.contextType.Provider._value;
    } */
  //如果要更新走，组件的更新逻辑
  if (willUpdate) classInstance.updateComponent();
}
export class Component {
  static isClassComponent = true;
  state: {};
  props: any;
  updater: any;
  oldRenderVDom: any;
  componentDidUpdate: any;
  getSnapshotBeforeUpdate: any;
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }
  setState(partialState, callback?) {
    this.updater.addState(partialState, callback);
  }
  updateComponent() {
    let newRenderVDom = this.render(); //重新调用render方法，得到新的虚拟DOM div#counter
    let oldRenderVDom = this.oldRenderVDom; //div#counter
    let oldDOM = findDOM(oldRenderVDom); //div#counter
    let extraArgs =
      this.getSnapshotBeforeUpdate && this.getSnapshotBeforeUpdate();
    //深度比较新旧两个虚拟DOM
    compareTwoVDom(oldDOM.parentNode, oldRenderVDom, newRenderVDom);
    this.oldRenderVDom = newRenderVDom;
    if (this.componentDidUpdate) {
      this.componentDidUpdate(this.props, this.state, extraArgs);
    }
  }
  render() {
    throw new Error("Method not implemented.");
  }
}
export function findDOM(vDom) {
  let { type } = vDom;
  let dom;
  if (typeof type === "function") {
    //如果是组件的话
    dom = findDOM(vDom.oldRenderVDom);
  } else {
    ///普通的字符串，那说明它是一个原生组件。dom指向真实DOM
    dom = vDom.dom;
  }
  return dom;
}

export function compareTwoVDom(parentDom, oldVDom, newVDom) {
  //如果老的是null新的也是null
  if (!oldVDom && !newVDom) {
    return null;
  } else if (oldVDom && !newVDom) {
    //如果老有,新没有,意味着此节点被删除了
    let currentDOM = findDOM(oldVDom);
    if (currentDOM) parentDom.removeChild(currentDOM);
  } else if (!oldVDom && newVDom) {
    //如果说老没有,新的有,新建DOM节点
    let newDom = createDom(newVDom); //创建一个新的真实DOM并且挂载到父节点DOM上
    parentDom.appendChild(newDom);
  } else if (oldVDom && newVDom && oldVDom.type !== newVDom.type) {
    //如果类型不同，也不能复用了，也需要把老的替换新的
    let oldDom = oldVDom.dom;
    let newDom = createDom(newVDom);
    oldDom.parentNode.replaceChild(newDom, oldDom);
  } else {
    //新节点和老节点都有值
    if (oldVDom.type === REACT_TEXT) {
      //文件节点
      //文件节点
      let currentDOM = (newVDom.dom = oldVDom.dom); //复用老的真实DOM节点
      currentDOM.textContent = newVDom.props.content; //直接修改老的DOM节点的文件就可以了
    } else if (typeof oldVDom.type === "string") {
      // 原生节点
      let currentDOM = (newVDom.dom = oldVDom.dom); //复用老的DIV的真实DOM div#counter
      updateProps(currentDOM, newVDom.props); //更新自己的属性
    } else if (typeof oldVDom.type === "function") {
      if (oldVDom.type.isClassComponent) {
        updateClassComponent(newVDom, oldVDom);
      } else {
        updateFunctionComponent(newVDom, oldVDom);
      }
    }
  }
}

function updateClassComponent(newVDom, oldVDom) {
  let classInstance = (newVDom.classInstance = oldVDom.classInstance); //类的实例需要复用。类的实例不管更新多少只有一个
  newVDom.oldRenderVDom = oldVDom.oldRenderVDom; //上一次的这个类组件的渲染出来的虚拟DOM
  if (classInstance.componentWillReceiveProps) {
    //组件将要接收到新的属性
    classInstance.componentWillReceiveProps();
  }
  //触发组件的更新，要把新的属性传过来
  classInstance.updater.emitUpdate(newVDom.props);
}
function updateFunctionComponent(newVDom, oldVDom) {
  let parentDOM = findDOM(oldVDom).parentNode; //div#counter
  let { type, props } = newVDom; //FunctionCounter {count:2,children:[div]}
  let oldRenderVDom = oldVDom.oldRenderVDom; //老的渲染出来的vDom div#counter-function>0
  let newRenderVDom = type(props); //新的vDom div#counter-function>2
  compareTwoVDom(parentDOM, oldRenderVDom, newRenderVDom);
  newVDom.oldRenderVDom = newRenderVDom;
}
