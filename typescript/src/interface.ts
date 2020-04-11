/**
 * 接口
 *  TypeScript的核心原则之一是对值所具有的结构进行类型检查
 *  它有时被称做“鸭式辨型法”或“结构性子类型化”。
 *  接口一方面可以在面向对象编程中表示为行为的抽象，另外可以用来描述对象的形状
 *  接口就是把一些类中共有的属性和方法抽象出来,可以用来约束实现此接口的类
 *  一个类可以继承另一个类并实现多个接口
 *  接口像插件一样是用来增强类的，而抽象类是具体类的抽象概念
 *  一个类可以实现多个接口，一个接口也可以被多个类实现，但一个类的可以有多个子类，但只能有一个父类
 */

 /**
  * 1.描述对象
  *     接口可以用来描述`对象的形状`,少属性或者多属性都会报错
  * 
  */
 interface Person{
    name:string;
    speak():void;
    age?:number;//？表示可选属性
}

let student:Person = {
    speak(){},//少属性会报错
    name,
}

/**
 * 2. 行为的抽象 
 */

interface Eatable{
    eat():void
}

class man implements Eatable{
    eat(){}
}
/**
 * 3. 修饰词 任意属性 只读属性   可选属性
 *
 */

interface Person2 {
    readonly id: number;
    name: string;
    [propName: string]: any;
  }
  
let p1 :Person2= {
    id:1,
    name:'ts',
    age:10
}

/**
 * 4.接口的继承
 *  一个接口可以继承自另外一个接口
 */
interface speakEn {
    speak(): void
}
interface SpeakChinese extends speakEn {
    speakChinese(): void
}
class GoodStudent implements SpeakChinese {
    speak() {
        console.log('english')
    }
    speakChinese() {
        console.log('chinese')
    }
}
/**
 * 5.函数类型接口
 */
interface discount{
    (price:number):number
  }
let cost:discount = function(price:number):number{
    return price * .8;
}
/**
 * 6.可索引接口  对数组和对象进行约束
 */

interface studentsList {
    [index:number]:string
  }
let arr:studentsList = ['t1','t2'];
console.log(arr);

interface studentsMap {
[index:string]:string
}
let obj:studentsMap = {name:'tom',addr:'nj'};

/**
 * 7.类接口 
 */

interface Person3 {
    name: string;
    speak(words: string): void
}
class Student implements Person3 {
    name!: string;
    speak(words:string) {
        console.log(words);
    }
}

/**
 * 8. 构造函数的类型
 *  使用interface里特殊的new()关键字来描述类的构造函数类型
 */

class Student2{
    public name:string
    constructor(name:string,public age:number){
        this.name=name
    }
  }
  interface WithNameClass{
    new(name:string,age:number):Student2
  }
  function createStudent(clazz:WithNameClass,name:string,age:number){
     return new clazz(name,age);
  }
  let a = createStudent(Student2,'zhufeng',18);
  console.log(a.name);

export {}