

### ASI (Automatic Semicolon Insertion) 

当存在换行符（line break）时，在大多数情况下可以省略分号
下面的代码也是可以运行的：
```
alert('Hello')
alert('World')
```
在这，JavaScript 将换行符理解成“隐式”的分号

```
当语句中包含语法中的限制产品后跟一个行终止符的时候，将会在结尾插入一个分号。带“这里没有行终止符”规则的语句有：

后置运算符（++ 和 --）
continue
break
return
yield、yield*
module

return
a + b

// 将被 ASI 转换为

return;
a + b;
```

【参考】
- [ASI 规则](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar)
- [javascript indo 代码结构](https://zh.javascript.info/structure)

### use strict
**背景**： 长久以来，JavaScript 不断向前发展且并未带来任何兼容性问题。新的特性被加入，旧的功能也没有改变。

这么做有利于兼容旧代码，但缺点是 JavaScript 创造者的任何错误或不完善的决定也将永远被保留在 JavaScript 语言中。

这种情况一直持续到 2009 年 ECMAScript 5 (ES5) 的出现。ES5 规范增加了新的语言特性并且修改了一些已经存在的特性。为了保证旧的功能能够使用，大部分的修改是默认不生效的。你需要一个特殊的指令 —— "use strict" 来明确地激活这些特性。

当它处于脚本文件的顶部时，则整个脚本文件都将以“现代”模式进行工作。比如：
```
"use strict";

// 代码以现代模式工作
...
```
#### 示例
未采用 use strict 下的赋值
一般，我们需要在使用一个变量前定义它。但是在早期，我们可以不使用 let 进行变量声明，而可以简单地通过赋值来创建一个变量。现在如果我们不在脚本中使用 use strict 声明启用严格模式，这仍然可以正常工作，这是为了保持对旧脚本的兼容。
```
// 注意：这个例子中没有 "use strict"

num = 5; // 如果变量 "num" 不存在，就会被创建

alert(num); // 5
```