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
分为严格模式和非严格模式
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



```
let user = {
  firstName: "John",
  say(time, phrase) {
    
    function test(){
        this.firstName = 'rujunqiao'
        alert(this.firstName);
        return function() {
            this.firstName = 'wen'
              alert('inside', this.firstName);
        }
    }
    return test
  }
};

user.say()()()
```