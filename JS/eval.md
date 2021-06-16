## 可以做什么？
内建函数 eval 允许执行一个代码字符串。

例如：
```
let code = 'alert("Hello")';
eval(code); // Hello
```

现代编程中，已经很少使用 eval 了。人们经常说“eval 是魔鬼”。

原因很简单：很久很久以前，JavaScript 是一种非常弱的语言，很多东西只能通过 eval 来完成。不过那已经是十年前的事了。

如今几乎找不到使用 eval 的理由了。如果有人在使用它，那这是一个很好的使用现代语言结构或 JavaScript Module 来替换它们的机会。

请注意，eval 访问外部变量的能力会产生副作用。


## 总结
调用 eval(code) 会运行代码字符串，并返回最后一条语句的结果。

- 在现代 JavaScript 编程中，很少使用它，通常也不需要使用它。
- 可以访问外部局部变量。这被认为是一个不好的编程习惯。
- 要在全局作用域中 eval 代码，可以使用 window.eval(code) 进行替代。
- 此外，如果你的代码需要从外部作用域获取数据，请使用 new Function，并将数据作为参数传递给函数。
