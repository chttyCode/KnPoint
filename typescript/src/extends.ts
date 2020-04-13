/**
 * 1.扩展全局变量的类型
 */

 //扩展类的原型
interface String {
    double():string;
}

String.prototype.double = function(){
    return this+'+'+this;
}
console.log('hello'.double());

//扩展类的实例
interface Window{
    myname:string
}
console.log(window.myname);
//export {} 没有导出就是全局扩展

/**
 * 2.模块内全局扩展
 */
declare global{
    interface String {
        double():string;
    }
    interface Window{
        myname:string
    }
}

export  {}