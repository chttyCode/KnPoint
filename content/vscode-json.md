# 如何在vscode中配置json编码提示

* 问题：在tsconfig. json、package. json中有编码提示，在prettierrc. json中却没有提示

* 搜索一番在[VSCode Json editing docs](超链接地址 "https://code.visualstudio.com/docs/languages/json")中找到了答案

* vscode 默认支持package. json、tsconfig. json等常见的 JSON 配置, 特殊的JSON需要手动设置

* 如何设置
    - 在settings.json 手动设置

``` 

``` JS
// JavaScript
"json.schemas": [{
  "fileMatch": [
    "/.prettierrc.json"
  ],
  "url": "https://json.schemastore.org/prettierrc"
}]
```

* 如何查找指定的schemas

    - 在 [JSON Schema Store](超链接地址 "https://www.schemastore.org/json/")查找需要的json schemas 
    - 按上例指定json扩展

> [JSON schema for the win](超链接地址 "https://glebbahmutov.com/blog/json-schema-for-the-win/")
> [J如何扩展 VSCode JSON 智能提示？](超链接地址 "https://cloud.tencent.com/developer/article/1633934")
