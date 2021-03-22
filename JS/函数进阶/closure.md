文章：https://zh.javascript.info/closure

## 示例：
### 1. 
```
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

alert( counter2() ); // ?
alert( counter2() ); // ?
```
答案是：0，1。

函数 counter 和 counter2 是通过 makeCounter 的不同调用创建的。

因此，它们具有独立的外部词法环境，每一个都有自己的 count。

### 2.
```
let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

sayHi();
```
答案：error。

函数 sayHi 是在 if 内声明的，所以它只存在于 if 中。外部是没有 sayHi 的。

在这里，我们可以看到”不存在“的变量与未初始化的变量之间的差异。

当脚本开始运行，词法环境预先填充了所有声明的变量。最初，它们处于“未初始化（Uninitialized）”状态。这是一种特殊的内部状态，这意味着引擎知道变量，但是在用 let 声明前，不能引用它。几乎就像变量不存在一样。

### 3. 
```
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // 创建一个 shooter 函数，
      alert( i ); // 应该显示其编号
    };
    shooters.push(shooter); // 将此 shooter 函数添加到数组中
    i++;
  }

  // ……返回 shooters 数组
  return shooters;
}

let army = makeArmy();

// ……所有的 shooter 显示的都是 10，而不是它们的编号 0, 1, 2, 3...
army[0](); // 编号为 0 的 shooter 显示的是 10
army[1](); // 编号为 1 的 shooter 显示的是 10
army[2](); // 10，其他的也是这样。
```
https://zh.javascript.info/closure