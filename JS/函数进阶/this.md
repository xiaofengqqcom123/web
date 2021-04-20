this 指向，很容易让人迷惑，下面由简入深，讲解下this指向. 
this 的值是在代码运行时计算出来的，它取决于代码上下文。它的值并不取决于方法声明的位置，而是取决于在“点符号前”的是什么对象。

## 1. 对象里的this
### a. 常规用法
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
### b.this丢失？
```
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");

setTimeout(button.click, 1000); // undefined
```

如何解决呢？
- 传递一个包装函数，例如 setTimeout(() => button.click(), 1000)。
- 将方法绑定到对象，例如在 constructor 中
- 类字段提供了另一种非常优雅的语法
```
class Button {
  constructor(value) {
    this.value = value;
  }
  click = () => {
    alert(this.value);
  }
}

let button = new Button("hello");

setTimeout(button.click, 1000); // hello
```

## 2. 函数中的this
### 1. 箭头函数
在箭头函数出现之前，每一个新函数根据它是被如何调用的来定义这个函数的this值：

- 如果是该函数是一个构造函数，this指针指向一个新的对象
- 在严格模式下的函数调用下，this指向undefined
- 如果是该函数是一个对象的方法，则它的this指针指向这个对象，等等

1. 案例一
```
const obj = {
    a: function() { console.log(this) },
    
    b: {
    	c: () => {console.log(this)}
	  },
    bb: {
      c: function() {console.log(this)}
    }
}
obj.a()   // 没有使用箭头函数打出的是obj
obj.b.c() // 打出的是window对象！！
obj.bb.c() // bb
```
2. 案例二
```
class Button {
  constructor(value) {
    this.value = value;
  }
  click = () => {
    alert(this.value);
  }
}

let button = new Button("hello");

let test = button.click
test()
setTimeout(button.click, 1000); // hello
```


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
### 2. 常规函数
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

### 3. 严格模式和非严格模式
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
### 4. setTimeout、setInterval 与 this
```
function Person() {
  // Person() 构造函数定义 `this`作为它自己的实例.
  this.age = 0;

  setInterval(function growUp() {
    // 在非严格模式, growUp()函数定义 `this`作为全局对象,
    // 与在 Person()构造函数中定义的 `this`并不相同.
    this.age++;
  }, 1000);
}

var p = new Person();
```

1. 在ECMAScript 3/5中，通过将this值分配给封闭的变量，可以解决this问题
```
function Person() {
  var that = this;
  that.age = 0;

  setInterval(function growUp() {
    // 回调引用的是`that`变量, 其值是预期的对象.
    that.age++;
  }, 1000);
}
```
2. 箭头函数
箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this。因此，在下面的代码中，传递给setInterval的函数内的this与封闭函数中的this值相同：
```
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this| 正确地指向 p 实例
  }, 1000);
}

var p = new Person();
```


