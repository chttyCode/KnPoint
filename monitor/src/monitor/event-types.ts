interface BaseError {
  kind: string; //监控指标的大类
  type: string; //小类型 这是一个错误
  errorType: string; //JS执行错误
  message?: string; //报错信息
  filename: string; //哪个文件报错了
  //body div#container div.content input
  selector: string; //代表最后一个操作的元素
}

export interface JsErrorTypes extends BaseError {
  position: string; // 行列
  stack: string; // 堆栈信息
}
export interface resourceErrorTypes extends BaseError {
  tagName: string; // 标签
}
