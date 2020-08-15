* markdown

    - plugin:markdown-formatter
    - setting:

``` JS
// settings.json
// markdown-formatter conf
// 按照js格式化
// "markdownFormatter.codeAreaToBlock": "js",
// 不格式化
"markdownFormatter.codeAreaToBlock": "",
// 自动格式化标点
"markdownFormatter.fullWidthTurnHalfWidth": "auto",
// 中文标点格式化为英文
// "markdownFormatter.fullWidthTurnHalfWidth": "，：；！“”‘’（）？。",
"markdownFormatter.formatOpt": {
  "indent_size": 2
},
"[markdown]": {
  // 自动保存
  "editor.formatOnSave": true,
  // 显示空格
  "editor.renderWhitespace": "all",
  // 快速补全
  "editor.quickSuggestions": {
    "other": true,
    "comments": true,
    "strings": true
  },
  // snippet 提示优先
  "editor.snippetSuggestions": "top",
  "editor.tabCompletion": "on",
  // 使用enter 接受提示
  "editor.acceptSuggestionOnEnter": "on",
  // 默认格式化工具为本工具
  "editor.defaultFormatter": "mervin.markdown-formatter"
}
```
