### 1. prototype
作用：F.prototype 属性仅在 new F 被调用时使用，它为新对象的 [[Prototype]] 赋值

每个函数都有 “prototype” 属性，即使我们没有提供它。
F.prototype 的值要么是一个对象，要么就是 null：其他值都不起作用。

默认的 "prototype" 是一个只有属性 constructor 的对象，属性 constructor 指向函数自身。

```
function Rabbit() {}

/* default prototype
Rabbit.prototype = { constructor: Rabbit };
*/

alert( Rabbit.prototype.constructor == Rabbit ); // true
```

**使用场景**
当我们有一个对象，但不知道它使用了哪个构造器（例如它来自第三方库），并且我们需要创建另一个类似的对象时，用这种方法就很方便。
```
function Rabbit(name) {
  this.name = name;
  alert(name);
}

let rabbit = new Rabbit("White Rabbit");

let rabbit2 = new rabbit.constructor("Black Rabbit");
```

不过会引来新的问题，……JavaScript 自身并不能确保正确的 "constructor" 函数值。例如：
```
function Rabbit() {}
Rabbit.prototype = {
  jumps: true
};

let rabbit = new Rabbit();
alert(rabbit.constructor === Rabbit); // false
```
**原型的原型**
- 所有的内建对象都遵循相同的模式（pattern）：
> 方法都存储在 prototype 中（Array.prototype、Object.prototype、Date.prototype 等）。
对象本身只存储数据（数组元素、对象属性、日期）。
- 原始数据类型也将方法存储在包装器对象的 prototype 中：Number.prototype、String.prototype 和 Boolean.prototype。只有 undefined 和 null 没有包装器对象。
- 内建原型可以被修改或被用新的方法填充。但是不建议更改它们。唯一允许的情况可能是，当我们添加一个还没有被 JavaScript 引擎支持，但已经被加入 JavaScript 规范的新标准时，才可能允许这样做。


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









