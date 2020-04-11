/**
 * 1. 函数的定义
 *  指定参数的类型和返回值的类型
 */
function hello(name:string):void {
    console.log('hello',name);
}
hello('typescript');
/**
 * 2.定义函数类型
 */

// type hello2 = (x:string,y)=>string;//参数“y”隐式具有“any”类型  =>noImplicitAny:Raise error on expressions and declarations with an implied 'any' type.
let hello1 = function(name:string,word:string){
    return name + word;
  }

type hello2 = (x:string,y:string)=>string
let hello2:hello2 = function(name,word){
  return name + word;
}

/**
 * 3.可选参数
 *  可选参数,而且必须是最后一个参数 
 */

function print(name:string,age?:number):void {
    console.log(name,age);
}
print('typescript');

/**
 * 4.默认参数
 */

function ajax(url:string,method:string='GET') {
    console.log(url,method);
}
ajax('/userdetail');

/**
 * 5.剩余参数
 */
function sum(...numbers:number[]) {
    return numbers.reduce((val,item)=>val+=item,0);
}
console.log(sum(1,2,3));
/**
 * 6.函数重载
 *  重载函数必须依次声明和定义
 */
function fetchByName(name:string){}
function fetchByCode(code:number){}
let obj: any={};
function getDetail(val: string): void;
function getDetail(val: number): void;
function getDetail(val:any):void {
    if (typeof val === 'string') {
        fetchByName(val)
    } else {
        fetchByCode(val)
    }
}
// getDetail(true)
export {}