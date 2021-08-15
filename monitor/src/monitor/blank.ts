import tracker from "./tracker";
import { onload } from "./utils";
export function blankScreen() {
  let wrapperElements = ["html", "body", "#container", ".content"];
  let emptyPoints = 0;
  function getSelector(element: any) {
    if (element.id) {
      return "#" + element.id;
    } else if (element.className) {
      // a b c => .a.b.c
      return (
        "." +
        element.className
          .split(" ")
          .filter((item: string) => !!item)
          .join(".")
      );
    } else {
      return element.nodeName.toLowerCase();
    }
  }
  function isWrapper(element: Element) {
    let selector = getSelector(element);
    if (wrapperElements.indexOf(selector) != -1) {
      emptyPoints++;
    }
  }
  onload(function () {
    for (let i = 1; i <= 9; i++) {
      let xElements = document.elementsFromPoint(
        (window.innerWidth * i) / 10,
        window.innerHeight / 2
      );
      let yElements = document.elementsFromPoint(
        window.innerWidth / 2,
        (window.innerHeight * i) / 10
      );
      isWrapper(xElements[0]);
      isWrapper(yElements[0]);
    }

    if (emptyPoints >= 18) {
      let centerElements = document.elementsFromPoint(
        window.innerWidth / 2,
        window.innerHeight / 2
      );
      tracker.send({
        kind: "stability",
        type: "blank",
        emptyPoints,
        screen: window.screen.width + "X" + window.screen.height,
        viewPoint: window.innerWidth + "X" + window.innerHeight,
        selector: getSelector(centerElements[0]),
      });
    }
  });
}
