"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 1. 函数的定义
 *  指定参数的类型和返回值的类型
 */
function hello(name) {
    console.log('hello', name);
}
hello('typescript');
/**
 * 2.定义函数类型
 */
// type hello2 = (x:string,y)=>string;//参数“y”隐式具有“any”类型  =>noImplicitAny:Raise error on expressions and declarations with an implied 'any' type.
var hello1 = function (name, word) {
    return name + word;
};
var hello2 = function (name, word) {
    return name + word;
};
/**
 * 3.可选参数
 *  可选参数,而且必须是最后一个参数
 */
function print(name, age) {
    console.log(name, age);
}
print('typescript');
/**
 * 4.默认参数
 */
function ajax(url, method) {
    if (method === void 0) { method = 'GET'; }
    console.log(url, method);
}
ajax('/userdetail');
/**
 * 5.剩余参数
 */
function sum() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (val, item) { return val += item; }, 0);
}
console.log(sum(1, 2, 3));
/**
 * 6.函数重载
 *  重载函数必须依次声明和定义
 */
function fetchByName(name) { }
function fetchByCode(code) { }
var obj = {};
function getDetail(val) {
    if (typeof val === 'string') {
        fetchByName(val);
    }
    else {
        fetchByCode(val);
    }
}
