##  static function
我们可以把一个方法赋值给类的函数本身，而不是赋给它的 "prototype"。这样的方法被称为 静态的（static）。

静态方法被用于实现属于整个类的功能。它与具体的类实例无关。
```
class User {
  static staticMethod() {
    alert(this === User);
  }
}

User.staticMethod(); // true

// 等价于
User.staticMethod = function () {
    alert(this === User);
}

```

## static 属性
```
class Article {
  static publisher = "Levi Ding";
}

alert( Article.publisher ); // Levi Ding

// 等价于
Article.publisher = "Levi Ding";
```
## static function 继承
```
class Animal {
  static planet = "Earth";

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }

}

// 继承于 Animal
class Rabbit extends Animal {
    ...
}

let rabbits = [
  new Rabbit("White Rabbit", 10),
  new Rabbit("Black Rabbit", 5)
];

rabbits.sort(Rabbit.compare);

rabbits[0].run(); // Black Rabbit runs with speed 5.
```
现在我们调用 Rabbit.compare 时，继承的 Animal.compare 将会被调用.

如何工作的？ 来看extends 做了什么？

<img src="./assets/static_extends.png"/>

## 私有的和受保护的属性和方法
为了隐藏内部接口，我们使用受保护的或私有的属性：

- 受保护的字段以 _ 开头。这是一个众所周知的约定，不是在语言级别强制执行的。程序员应该只通过它的类和从它继承的类中访问以 _ 开头的字段。
- 私有字段以 # 开头。JavaScript 确保我们只能从类的内部访问它们。

目前，各个浏览器对私有字段的支持不是很好，但可以用 polyfill 解决。

## 扩展内建类
