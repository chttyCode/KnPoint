import tracker from "./tracker";
import { getLastEvent } from "./utils";
import { getSelector } from "./utils";
export function longTask() {
  new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.duration > 100) {
        let lastEvent = getLastEvent();
        //@ts-ignore
        requestIdleCallback(() => {
          tracker.send({
            kind: "experience",
            type: "longTask",
            eventType: lastEvent.type,
            startTime: entry.startTime, // 开始时间
            duration: entry.duration, // 持续时间
            selector: lastEvent
              ? getSelector(lastEvent.path || lastEvent.target)
              : "",
          });
        });
      }
    });
  }).observe({ entryTypes: ["longtask"] });
}
