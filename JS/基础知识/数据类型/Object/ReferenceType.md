## this 丢失？

```
let user = {
  name: "John",
  hi() { alert(this.name); }
}

// 把获取方法和调用方法拆成两行
let hi = user.hi;
hi(); // 报错了，因为 this 的值是 undefined
```

下面我们来一点点分析原因~

### Reference Type
仔细看的话，我们可能注意到 obj.method() 语句中的两个操作：

1. 首先，点 '.' 取了属性 obj.method 的值。
2. 接着 () 执行了它。

那么，this 的信息是怎么从第一部分传递到第二部分的呢？
```
let user = {
  name: "John",
  hi() { alert(this.name); }
}

// 把获取方法和调用方法拆成两行
let hi = user.hi;
hi(); // 报错了，因为 this 的值是 undefined
```
这里 hi = user.hi 把函数赋值给了一个变量，接下来在最后一行它是完全独立的，所以这里没有 this。

为确保 user.hi() 调用正常运行，JavaScript 玩了个小把戏 —— 点 '.' 返回的不是一个函数，而是一个特殊的 Reference Type 的值。

Reference Type 是 ECMA 中的一个“规范类型”。我们不能直接使用它，但它被用在 JavaScript 语言内部。

Reference Type 的值是一个三个值的组合 (base, name, strict)，其中：

- base 是对象。
- name 是属性名。
- strict 在 use strict 模式下为 true。

对属性 user.hi 访问的结果不是一个函数，而是一个 Reference Type 的值。对于 user.hi，在严格模式下是：

// Reference Type 的值
(user, "hi", true)

当 () 被在 Reference Type 上调用时，它们会接收到关于对象和对象的方法的完整信息，然后可以设置正确的 this（在此处 =user）。

Reference Type 是一个特殊的“中间人”内部类型，目的是从 . 传递信息给 () 调用。

任何例如赋值 hi = user.hi 等其他的操作，都会将 Reference Type 作为一个整体丢弃掉，而会取 user.hi（一个函数）的值并继续传递。所以任何后续操作都“丢失”了 this。

因此，this 的值仅在函数直接被通过点符号 obj.method() 或方括号 obj['method']() 语法（此处它们作用相同）调用时才被正确传递。还有很多种解决这个问题的方式，例如 func.bind()。

### 测试
1. 
```
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // 正常运行

// 现在让我们基于 name 来选择调用 user.hi 或 user.bye
(user.name == "John" ? user.hi : user.bye)(); 
```
**结果是啥？**

Error

【解析】：任何例如赋值 hi = user.hi 等其他的操作，都会将 Reference Type 作为一个整体丢弃掉，所以 this 会丢失~





