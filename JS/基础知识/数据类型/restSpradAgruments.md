## Spread 语法

例如，内建函数 Math.max 会返回参数中最大的值：

alert( Math.max(3, 5, 1) ); // 5

假如我们有一个数组 [3, 5, 1]，我们该如何用它调用 Math.max 呢？

直接把数组“原样”传入是不会奏效的，因为 Math.max 希望你传入一个列表形式的数值型参数，而不是一个数组：
```
let arr = [3, 5, 1];

alert( Math.max(arr) ); // NaN
```

Spread 语法 来帮助你了！它看起来和 rest 参数很像，也使用 ...，但是二者的用途完全相反。

当在函数调用中使用 ...arr 时，它会把可迭代对象 arr “展开”到参数列表中。

**用处：**
```
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25


// 2. 合并数组
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

let merged = [0, ...arr, 2, ...arr2];

alert(merged); // 0,3,5,1,2,8,9,15（0，然后是 arr，然后是 2，然后是 arr2）

// 3. alert
let str = "Hello";

alert( [...str] ); // H,e,l,l,o
alert(str) // H,e,l,l,o
```

Spread 语法内部，使用迭代器来收集元素；所以只适用于可迭代对象；Array.from 适用于类数组对象也适用于可迭代对象。


## rest 

当我们在代码中看到 "..." 时，它要么是 rest 参数，要么就是 spread 语法。

有一个简单的方法可以区分它们：

若 ... 出现在函数参数列表的最后，那么它就是 rest 参数，它会把参数列表中剩余的参数收集到一个数组中。
若 ... 出现在函数调用或类似的表达式中，那它就是 spread 语法，它会把一个数组展开为列表。

使用场景：

Rest 参数用于创建可接受任意数量参数的函数。
Spread 语法用于将数组传递给通常需要含有许多参数的列表的函数。
它们俩的出现帮助我们轻松地在列表和参数数组之间来回转换。

“旧式”的 arguments（类数组且可迭代的对象）也依然能够帮助我们获取函数调用中的所有参数。


## agruments
只之前没有 rest 参数时，通过agruments获取函数参数，是唯一方法

注意：
箭头函数是没有 "arguments"
```
function f() {
  let showArg = (2) => alert(arguments[0]);
  showArg();
}

f(1); // 1
// Uncaught SyntaxError: Invalid destructuring assignment target
```
我们已经知道，箭头函数没有自身的 this。现在我们知道了它们也没有特殊的 arguments 对象。