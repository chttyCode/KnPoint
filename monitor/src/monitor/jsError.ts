import { getLastEvent, getSelector } from "./utils";
import tracker from "./tracker";
export function jsErrorMonitor() {
  // js错误+资源异常
  window.addEventListener(
    "error",
    function (event: ErrorEvent) {
      let lastEvent = getLastEvent();
      const target = event.target as any;
      if (target.src) {
        tracker.send({
          kind: "stability", //监控指标的大类
          type: "error", //小类型 这是一个错误
          errorType: "resourceError", //js或css资源加载错误
          filename: target.src || target.href, //哪个文件报错了
          tagName: target.tagName, //SCRIPT
          //body div#container div.content input
          selector: getSelector(event.target), //代表最后一个操作的元素
        });
      } else {
        tracker.send({
          kind: "stability",
          type: "error",
          errorType: "jsError",
          message: event.message,
          filename: event.filename,
          position: `${event.lineno}:${event.colno}`,
          stack: getLines(event.error.stack),
          selector: lastEvent ? getSelector(lastEvent.path) : "",
        });
      }
    },
    true
  );
  // promise未捕获异常
  window.addEventListener(
    "unhandledrejection",
    (event) => {
      console.log(event);
      let lastEvent = getLastEvent(); //最后一个交互事件
      console.log(lastEvent);
    },
    true
  );
}
function getLines(stack: string) {
  return stack
    .split("\n")
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ""))
    .join("^");
}
