export interface LastEvent extends Event {
  path: string;
}
let lastEvent: LastEvent;
["click", "touchstart", "mousedown", "keydown", "mouseover"].forEach(
  (eventType) => {
    // @ts-ignore
    document.addEventListener(
      eventType,
      (event: LastEvent) => {
        lastEvent = event;
      },
      {
        capture: true, //捕获阶段
        passive: true, //默认不阻止默认事件
      }
    );
  }
);
export function getLastEvent(): LastEvent {
  return lastEvent;
}
export function getSelector(path?: any) {
  if (!path) return;
  return path
    .reverse()
    .filter((element: any) => {
      return element !== document && element !== window;
    })
    .map((element: any) => {
      let selector = "";
      if (element.id) {
        return `${element.nodeName.toLowerCase()}#${element.id}`;
      } else if (element.className && typeof element.className === "string") {
        return `${element.nodeName.toLowerCase()}.${element.className}`;
      } else {
        selector = element.nodeName.toLowerCase();
      }
      return selector;
    })
    .join(" ");
}

// 注册监听 -白屏 https://chttycode.github.io/sys-doc/framework/monitor.html#%E7%9B%91%E6%8E%A7%E9%94%99%E8%AF%AF
export function onload(callback: () => void) {
  if (document.readyState === "complete") {
    callback();
  } else {
    window.addEventListener("load", callback);
  }
}
