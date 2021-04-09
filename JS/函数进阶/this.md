this 指向，很容易让人迷惑，下面由简入深，讲解下this指向. 
this 的值是在代码运行时计算出来的，它取决于代码上下文。它的值并不取决于方法声明的位置，而是取决于在“点符号前”的是什么对象。

### 1. 对象里的this
为了访问该对象，方法中可以使用 this 关键字。
```
let user = {
  name: "John",
  age: 30,

  sayHi() {
    // "this" 指的是“当前的对象”
    alert(this.name);
  }

};

user.sayHi(); // John
```
### 2. 函数中的this
##### 1. 箭头函数
箭头函数没有 this。如果访问 this，则会从外部获取。
```
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
  }
};

group.showList();
```
这里 forEach 中使用了箭头函数，所以其中的 this.title 其实和外部方法 showList 的完全一样。那就是：group.title。

不能对箭头函数进行 new 操作
不具有 this 自然也就意味着另一个限制：箭头函数不能用作构造器（constructor）。不能用 new 调用它们。

注意：也没有 arguments ~

这是因为，箭头函数是针对那些没有自己的“上下文”，但在当前上下文中起作用的短代码的。并且箭头函数确实在这种使用场景中大放异彩。
##### 2. 常规函数
```
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(function(student) {
      // Error: Cannot read property 'title' of undefined
      alert(this.title + ': ' + student)
    });
  }
};

group.showList();
```
报错是因为 forEach 运行它里面的这个函数，但是这个函数的 this 为默认值 this=undefined，因此就出现了尝试访问 undefined.title 的情况。

但箭头函数就没事，因为它们没有 this。

#### 3. 严格模式和非严格模式
```
// 非严格模式
function f1(){
  return this;
}
//在浏览器中：
f1() === window;   //在浏览器中，全局对象是window


// 严格模式
function f1(){
  "use strict"
  return this;
}
//在浏览器中：
f1() === undefined;   //在浏览器中，全局对象是window
```
