/**
 * 1.交叉类型
 *  交叉类型（Intersection Types）表示将多个类型合并为一个类型
 */
interface Person {
    name: string,
    speak(): void
}
interface Student {
    goSchool():void
}
type children = Person & Student;
let p: children = { name: 'tom', goSchool() { }, speak() { } };
/**
 * 2.typeof
 *  可以获取一个变量的类型
 */

let p1 = {
    name:'tom',
    age:10,
    gender:'male'
}
type People = typeof p1;
function getName(p:People):string{
    return p.name;
}
/**
 * 3.索引访问操作符
 */
interface Person{
    name:string;
    age:number;
    job:{
        name:string
    };
    interests:{name:string,level:number}[]
}
let FrontEndJob:Person['job'] = {
    name:'前端工程师'
}
let interestLevel:Person['interests'][0]['level'] = 2;
/**
 * 4.keyof
 *  获取对象key值的组成联合类型
 */

interface Person2{
    name:string;
    age:number;
    gender:'male'|'female';
  }
  //type PersonKey = 'name'|'age'|'gender';
  type PersonKey = keyof Person2;
  
  function getValueByKey(p:Person2,key:PersonKey){
    return p[key];
  }
  let val = getValueByKey({name:'tom',age:10,gender:'male'},'name');
  console.log(val);
/**
 * 5. 映射类型 
 * in操作符去批量定义类型中的属性
 */

interface Person3{
    name:string;
    age:number;
    gender:'male'|'female';
  }

  type PartPerson = {
    [Key in keyof Person3]?:Person3[Key]
  }
  type Part<T> = {
    [key in keyof T]?:T[key]
  }

  /**
   * 6. 内置工具类型
   */
  //Partial Partial 将属性变为可选
  type _Partial<T> = { [P in keyof T]?: T[P] };
  interface A {
    a1: string;
    a2: number;
    a3: boolean;
  }
  
  type aPartial = Partial<A>;
  type aPartial1 = _Partial<A>;
  //Required 将属性变为必选

  interface Person4{
    name:string;
    age:number;
    gender?:'male'|'female';
  }
  type _Require<T> = { [P in keyof T]-?: T[P] };
  let p2:Required<Person4> = {
    name:'tom',
    age:10,
    gender:'male'
  }

  //Readonly 将所有属性变为只读
  type _Readonly<T> = { readonly [P in keyof T]: T[P] };
  let p3:Readonly<Person4> = {
    name:'tom',
    age:10,
    gender:'male'
  }
  //   p3.age = 11;//Cannot assign to 'age' because it is a read-only property

  //Pick 选取
  type Pick<T, K extends keyof T> = { [P in K]: T[P] }
  let p4:Pick<Person4,'name'|'age'>={name:'1',age:1}

  //Exclude 
  type _Extract<T, U> = T extends U ? T : never;
  type  E = Extract<string|number,string>;
  let e:E = '1';
  
export {}