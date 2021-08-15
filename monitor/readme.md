# 前端监控

> [文档](https://chttycode.github.io/sys-doc/framework/monitor.html#%E6%8C%87%E6%A0%87%E5%88%86%E7%B1%BB)

## 监控的目的

- 发现问题、产品决策

## 监控目标

- 稳定性
  - JS 错误 JS 执行错误或者 promise 异常
  - 资源异常 script、link 等资源加载异常
  - 接口错误 ajax 或 fetch 请求接口异常
  - 白屏 页面空白
- 体验性
  - 加载时间 各个阶段的加载时间
  - TTFB(time to first byte)(首字节时间) 是指浏览器发起第一个请求到数据返回第一个字节所消耗的时间，这个时间包含了网络请求时间、后端处理时间
  - FP(First Paint)(首次绘制) 首次绘制包括了任何用户自定义的背景绘制，它是将第一个像素点绘制到屏幕的时刻
  - FCP(First Content Paint)(首次内容绘制) 首次内容绘制是浏览器将第一个 DOM 渲染到屏幕的时间,可以是任何文本、图像、SVG 等的时间
  - FMP(First Meaningful paint)(首次有意义绘制) 首次有意义绘制是页面可用性的量度标准
  - FID(First Input Delay)(首次输入延迟) 用户首次和页面交互到页面响应交互的时间
  - 卡顿 超过 50ms 的长任务
- 业务性
  - PV page view 即页面浏览量或点击量
  - UV 指访问某个站点的不同 IP 地址的人数
  - 页面的停留时间 用户在每一个页面的停留时间

## 监控方案

- 代码埋点
  - 就是通过代码嵌入的方式，对需要监控的事件，进行代码埋点上报
  - 优点
    - 可以做到精确埋点
  - 缺点
    - 工作量大
    - 对业务代码有侵入
- 无痕埋点
  - 对任意指定事件进行绑定上报
  - 优点
    - 采集全量数据，不会出现误埋、漏埋对现象
  - 缺点
    - 无法灵活定制
    - 数据量对服务器有压力

## 方案实现

- 项目搭建
  - webpack 内置 webpack-dev-server
  - script: webpack server
  - html-webpack-plugin
    - scriptLoading: 'blocking' ,以阻塞方式加载
- JS 错误
  - 定义错误类型
  - 获取错误事件对象
  - 格式化页面 selector,定位错误元素
  - 资源加载异常踩坑（html-webpack-plugin）
    - scriptLoading: 'blocking' ,以阻塞方式加载，监控脚本
    - 在捕获阶段获取错误事件对象
  - promise
- 资源异常
  - 判断 error 类型的属性
  - 踩坑
    - 在捕获阶段监听 error 事件

> https://blog.fundebug.com/2019/08/17/how-to-monitor-resource-error/
