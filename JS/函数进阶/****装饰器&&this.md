https://zh.javascript.info/call-apply-decorators
## 什么是装饰器（decorator）？

装饰器 是一个围绕改变函数行为的包装器。主要工作仍由该函数来完成。

装饰器可以被看作是可以添加到函数的 “features” 或 “aspects”。我们可以添加一个或添加多个。而这一切都无需更改其代码！

看一个示例，或许你会有更深的理解
```
function slow(x) {
  // 这里可能会有重负载的 CPU 密集型工作
  alert(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) {    // 如果缓存中有对应的结果
      return cache.get(x); // 从缓存中读取结果
    }

    let result = func(x);  // 否则就调用 func

    cache.set(x, result);  // 然后将结果缓存（记住）下来
    return result;
  };
}

slow = cachingDecorator(slow);

alert( slow(1) ); // slow(1) 被缓存下来了
alert( "Again: " + slow(1) ); // 一样的

alert( slow(2) ); // slow(2) 被缓存下来了
alert( "Again: " + slow(2) ); // 和前面一行结果相同
```

例题：
一旦方法被传递到与对象分开的某个地方 —— this 就丢失。例如：
```
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(user.sayHi, 1000); // Hello, undefined!
```
浏览器中的 setTimeout 方法有些特殊：它为函数调用设定了 this=window

那如何解决这个问题呢？
- 方式一：
```
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(()=> {
    user.sayHi()
}, 1000)
```
但是如果在 1 s中，user中的firstName变化了，怎么办呢？
```
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(()=> {
    user.sayHi()
}, 1000)

user.firstName = 'rujunqiao' // alert 内容是：Hello, rujunqiao
```

- 方式二：bind
```
let user = {
  firstName: "John",

};

function sayHi() {
     alert(this.firstName);
}

sayHi.bind(user)

setTimeout(sayHi, 1000)
```

## 偏函数
我们不仅可以绑定this，还可以绑定参数
```
// 我们封装成 double 函数
function mul(a, b) {
  return a * b;
}

let double = mul.bind(null, 2);
alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

应用场景：
当我们有一个非常通用的函数，并希望有一个通用型更低的该函数的变体时，偏函数会非常有用

## 没有上下文的 partial
https://zh.javascript.info/bind

```
_.partial(func, [partials])#
```
创建一个函数。 该函数调用 func，并传入预设的 partials 参数。 这个方法类似_.bind，除了它不会绑定 this。

```
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}

// 用法：
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// 添加一个带有绑定时间的 partial 方法
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
```

## 常见error
### 2次绑定bind
```
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

f();
```
答案：John。

仅在创建的时候记忆上下文（以及参数，如果提供了的话）。

一个函数不能被重绑定（re-bound）。






