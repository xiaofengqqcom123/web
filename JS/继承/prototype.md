js中是通过原型链实现继承的，在 JavaScript 中，对象有一个特殊的隐藏属性 [[Prototype]]（如规范中所命名的），它要么为 null，要么就是对另一个对象的引用。该对象被称为“原型”：
### 1. __proto__
__proto__ 与内部的 [[Prototype]] 不一样。__proto__ 是 [[Prototype]] 的 getter/setter

稍后，我们将看到在什么情况下理解它们很重要，在建立对 JavaScript 语言的理解时，让我们牢记这一点。

__proto__ 属性有点过时了。它的存在是出于历史的原因，现代编程语言建议我们应该使用函数 Object.getPrototypeOf/Object.setPrototypeOf 来取代 __proto__ 去 get/set 原型。稍后我们将介绍这些函数。

根据规范，__proto__ 必须仅受浏览器环境的支持。但实际上，包括服务端在内的所有环境都支持它，因此我们使用它是非常安全的。

由于 __proto__ 标记在观感上更加明显，所以我们在后面的示例中将使用它。

### 2. 写入原型
原型仅用于读取属性。

对于写入/删除操作可以直接在对象上进行。

### 原型链与this
```
let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" "); // * 
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

alert(admin.fullName); // John Smith (*)

// setter triggers!
admin.fullName = "Alice Cooper"; // (**)

alert(admin.fullName); // Alice Cooper，admin 的内容被修改了
alert(user.fullName);  // John Smith，user 的内容被保护了
```

问题：* 中的this是啥？是 user 还是 admin？

答案很简单：this 根本不受原型的影响。

无论在哪里找到方法：在一个对象还是在原型中。在一个方法调用中，this 始终是点符号 . 前面的对象。

继续，我们延伸下~
```
我们有两只仓鼠：speedy 和 lazy 都继承自普通的 hamster 对象。

当我们喂其中一只的时候，另一只也吃饱了。为什么？如何修复它？
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// 这只仓鼠找到了食物
speedy.eat("apple");
alert( speedy.stomach ); // apple

// 这只仓鼠也找到了食物，为什么？请修复它。
alert( lazy.stomach ); // apple


<!-- 解决 -->
// 方式一：每个对象有自己的 stomach
let lazy = {
  __proto__: hamster,
  stomach: []
};
// 方式二: 
  eat(food) {
    this.stomach.push(food);
  }

  =>
  eat(food) {
    this.stomach = [food]
  }

```

### 2. prototype
这里的 F.prototype 指的是 F 的一个名为 "prototype" 的常规属性。这听起来与“原型”这个术语很类似，但这里我们实际上指的是具有该名字的常规属性。

F.prototype 属性仅在 new F 被调用时使用，它为新对象的 [[Prototype]] 赋值

默认的 "prototype" 是一个只有属性 constructor 的对象，属性 constructor 指向函数自身。
```
function Rabbit() {}
Rabbit.prototype // {constructor: ƒ}

Rabbit.prototype.constructor == Rabbit // true
```









