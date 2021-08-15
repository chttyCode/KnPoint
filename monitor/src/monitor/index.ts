import { jsErrorMonitor } from "./jsError";
import { injectXHR } from "./xhr";
import { blankScreen } from "./blank";
import { timing } from "./time";
import { longTask } from "./longtask";
import { pv } from "./pv";
export default function trackerInit() {
  // js错误
  jsErrorMonitor();
  // 接口错误
  injectXHR();
  // 白屏监控
  blankScreen();
  // 体验监控
  timing();
  // 卡顿监控
  longTask();
  // pv监控
  pv();
}
