/**
 * 范型
 *  泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
 */

 /**
  * 1.泛型函数
  */
//  function createArray(length: number, value: any): Array<any> {
//     let result: any = [];
//     for (let i = 0; i < length; i++) {
//       result[i] = value;
//     }
//     return result;
//   }
//   let result = createArray(3,'x');
//   console.log(result);
function createArray2<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
let result = createArray2<string>(3,'x');
console.log(result);

/**
 * 2.类数组
 */

function sum() {
    let args: IArguments = arguments;
    for (let i = 0; i < args.length; i++) {
        console.log(args[i]);
    }
}

let root = document.getElementById('root');
let children: HTMLCollection = (root as HTMLElement).children;
children.length;
let nodeList: NodeList = (root as HTMLElement).childNodes;
nodeList.length;


/**
 * 3.泛型类
 */

class MyArray<T>{
    private list:T[]=[];
    add(value:T) {
        this.list.push(value);
    }

}
let arr=new MyArray<number>();
arr.add(1); arr.add(2); arr.add(0);

/**
 * 8.泛型接口
 */

interface Calculate{
    <T>(a:T,b:T):T
  }

let add:Calculate = function<T>(a:T,b:T):T{
    return a;
}

  add<number>(1,2)

//定义接口的时候也可以指定泛型
interface Calculate2<T>{
    (a:T,b:T):T
  }

// let add2:Calculate2<string>= function<T>(a:T,b:T):T{
//     return a;
// }
let add2:Calculate2<string>= function(a,b){
    return a;
}
add2('1','2')

/**
 * 9.多个类型参数
 */
function swap<A,B>(tuple:[A,B]):[B,A]{
    return [tuple[1],tuple[0]];
  }
  let swapped = swap<string,number>(['a',1]);
/**
 * 10.默认泛型类型
 */

function createArray3<T=number>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
      result[i] = value;
    }
    return result;
  }
//   let result2 = createArray3<string>(3,'x');
  let result2 = createArray3(3,'x');
  console.log(result2);

/**
 * 11.泛型约束
 *  在函数中使用泛型的时候，由于预先并不知道泛型的类型，所以不能随意访问相应类型的属性或方法
 */

// function logger<T>(val: T) {
//     console.log(val.length); //直接访问会报错
// }

interface LengthWise {
    length: number
}
//可以让泛型继承一个接口
function logger2<T extends LengthWise>(val: T) {
    console.log(val.length)
}
logger2('ts');

/**
 * 12.泛型类型别名
 *  泛型类型别名可以表达更复杂的类型
 */
type Cart<T> = {list:T[]} | T[];
let c1:Cart<string> = {list:['1']};
let c2:Cart<number> = [1];

/**
 * 泛型接口 vs 泛型类型别名
 *  接口创建了一个新的名字，它可以在其他任意地方被调用。而类型别名并不创建新的名字，例如报错信息就不会使用别名
 *  类型别名不能被 extends和 implements,这时我们应该尽量使用接口代替类型别名
 *  当我们需要使用联合类型或者元组类型的时候，类型别名会更合适
 */
export {}