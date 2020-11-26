## switch 
### 常规用法
switch 语句可以替代多个 if 判断。

switch 语句为多分支选择的情况提供了一个更具描述性的方式。

```
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

### 分组
共享同一段代码的几个 case 分支可以被分为一组：

比如，如果我们想让 case 3 和 case 5 执行同样的代码：

```
let a = 3;

switch (a) {
  case 4:
    alert('Right!');
    break;

  case 3: // (*) 下面这两个 case 被分在一组
  case 5:
    alert('Wrong!');
    alert("Why don't you take a math class?");
    break;

  default:
    alert('The result is strange. Really.');
}
```
### 类型很关键
强调一下，这里的相等是严格相等。被比较的值必须是相同的类型才能进行匹配。

比如，我们来看下面的代码：
```
let arg = prompt("Enter a value?")
switch (arg) {
  case '0':
  case '1':
    alert( 'One or zero' );
    break;

  case '2':
    alert( 'Two' );
    break;

  case 3:
    alert( 'Never executes!' );
    break;
  default:
    alert( 'An unknown value' )
}
```
 在 prompt 对话框输入 0、1，第一个 alert 弹出。
输入 2，第二个 alert 弹出。但是输入 3，因为 prompt 的结果是字符串类型的 "3"，不严格相等 === 于数字类型的 3，所以 case 3 不会执行！因此 case 3 部分是一段无效代码。所以会执行 default 分支。