js中是通过原型链实现继承的，在 JavaScript 中，对象有一个特殊的隐藏属性 [[Prototype]]（如规范中所命名的），它要么为 null，要么就是对另一个对象的引用。该对象被称为“原型”：

__proto__ 与内部的 [[Prototype]] 不一样。__proto__ 是 [[Prototype]] 的 getter/setter

稍后，我们将看到在什么情况下理解它们很重要，在建立对 JavaScript 语言的理解时，让我们牢记这一点。

__proto__ 属性有点过时了。它的存在是出于历史的原因，现代编程语言建议我们应该使用函数 Object.getPrototypeOf/Object.setPrototypeOf 来取代 __proto__ 去 get/set 原型。稍后我们将介绍这些函数。

根据规范，__proto__ 必须仅受浏览器环境的支持。但实际上，包括服务端在内的所有环境都支持它，因此我们使用它是非常安全的。

由于 __proto__ 标记在观感上更加明显，所以我们在后面的示例中将使用它。

### 1. 为什么 __proto__ 不规范呢？
看下面的例子：
```
let obj = {};

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // [object Object]，并不是 "some value"！
```

__proto__ 属性很特别：它必须是对象或者 null。字符串不能成为 prototype。这里如果用户输入 __proto__，那么赋值会被忽略！

那怎样使对象正常使用__proto__ 属性呢？
- 方法一：Object.create(null)

```
let obj = Object.create(null);

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // "some value"
```

我们知道果 obj.__proto__ 被读取或者赋值，那么对应的 getter/setter 会被从它的原型中调用，它会 set/get [[Prototype]]。
Object.create(null) 创建了一个空对象，这个对象没有原型（[[Prototype]] 是 null）

- 方法二：
改用 Map 来代替普通对象进行存储，这样一切都迎刃而解


### 2. 应该用啥代替 __proto__ ?
Object.getPrototypeOf(obj) —— 返回对象 obj 的 [[Prototype]]（与 __proto__ 的 getter 相同）。

Object.setPrototypeOf(obj, proto) —— 将对象 obj 的 [[Prototype]] 设置为 proto（与 __proto__ 的 setter 相同）。