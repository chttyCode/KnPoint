"use strict";
/**
 * 1.扩展全局变量的类型
 */
Object.defineProperty(exports, "__esModule", { value: true });
String.prototype.double = function () {
    return this + '+' + this;
};
console.log('hello'.double());
console.log(window.myname);
