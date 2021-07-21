import { getLastEvent, getSelector } from "./utils";
import tracker from "./xhr";

export function jsErrorMonitor() {
  window.addEventListener("error", function (event: ErrorEvent) {
    let lastEvent = getLastEvent();
    tracker({
      kind: "stability",
      type: "error",
      errorType: "jsError",
      message: event.message,
      filename: event.filename,
      position: `${event.lineno}:${event.colno}`,
      stack: getLines(event.error.stack),
      selector: lastEvent ? getSelector(lastEvent.path) : "",
    });
  });
}
function getLines(stack) {
  return stack
    .split("\n")
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ""))
    .join("^");
}
