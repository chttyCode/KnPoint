let userAgent = require("user-agent");
function getExtraData(): any {
  return {
    title: document.title,
    url: location.href,
    timestamp: Date.now(),
    userAgent: userAgent.parse(navigator.userAgent).name,
    //用户ID
  };
}
//gif图片做上传 图片速度 快没有跨域 问题，
class SendTracker {
  url: string;
  xhr: XMLHttpRequest;
  constructor() {
    this.url = "/logstores"; //上报的路径
    this.xhr = new XMLHttpRequest();
  }
  send(data = {}) {
    let extraData = getExtraData();
    let log = { ...extraData, ...data };
    //对象 的值不能是数字
    for (let key in log) {
      if (typeof log[key] === "number") {
        log[key] = `${log[key]}`;
      }
    }
    console.log("log", log);
    let body = JSON.stringify({
      __logs__: [log],
    });
    this.xhr.open("POST", this.url, true);
    this.xhr.onload = function () {
      // console.log(this.xhr.response);
    };
    this.xhr.onerror = function (error) {
      //console.log(error);
    };
    this.xhr.send(body);
  }
}
export default new SendTracker();
