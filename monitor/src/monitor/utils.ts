export interface LastEvent extends Event {
  path: string;
}
let lastEvent: LastEvent;
["click", "touchstart", "mousedown", "keydown", "mouseover"].forEach(
  (eventType) => {
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
export function getSelector(path) {
  return path
    .reverse()
    .filter((element) => {
      return element !== document && element !== window;
    })
    .map((element) => {
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
