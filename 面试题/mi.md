
1. HTML引入CSS的方式有哪些？

A: HTML element的style属性，HTML内部style标签引入，HTML外部link标签引入，CSS代码import引入。

2. png、jpg、gif三种图片格式如何选择，你还知道哪些图片格式？

A: 颜色简单、有透明的用png、颜色丰富(照片)用jpg，有动画的用gif。图片格式还有webp、svg等等。

3. 什么是盒子模型？

A: 由内到外：content-box、padding-box、border-box、margin-box，默认width、height是content-box的宽高，IE怪异模式下width、height是border-box的宽高。

4. 解释box-sizing: border-box的作用。

A: 设置width、height为border-box的宽高。

5. 什么是margin折叠？

A: 同一个BFC内的文档流里的多个相邻(兄弟和父子)块级元素的垂直方向的margin合并成一个。

6. 计算如下margin宽度折叠后的margin宽度：(3px, 5px)，(3px, -5px)，(3px, 5px, -4px)，并说明计算方法。

A: 5px， -2px，1px。计算方法是正值的最大值加上负值的最小值。

7. 
```
<div style="font-size: 10px">
    <p style="font: 2em/2em arial">test</p>
</div>
```
说出以上代码里p元素的font-size和line-height的computed value，并解释原因。
A: p元素的font-size为20px，line-height为40px，em相对于自身的font-size或继承的font-size。

8. em和rem的区别是什么？

A: em相对于自身的字体大小，而rem相对于root element(html)。
描述一下选择器的优先级。
A: 先比较选择器里id选择器的个数，如果相同则比较class选择器的个数，如果还相同就比较type(tag)选择器的个数。

9. inline、block、inline-block的区别是什么？

A: inline元素和其他inline元素在同一行展示，宽度由内容决定，无法设置宽度；block元素在新行开始，默认宽度为容器的宽度，可以设置宽度；inline-block从外面看是inline，里面看是block，可以设置宽度。

10. 什么是clearfix？写出clearfix的代码。

A: float的元素不在文档流里，无法撑开容器，clearfix就是为了解决这个问题。可以用overflow:hidden，也可以在容器末尾加一个空div并设置clear:both，还可以用如下代码：
```
.clearfix:after {
    content: '';
    display: block;
    clear: both;
}
Q:

<div>
    <img src="...">
    <p>text</p>
</div>
```
以上文档结构，如果设置img为float:left则p的文字会在图片的右边展示，如果文字很长则会绕到图片的下方，给出一个方案让文字都在图片的右边不绕到图片的下边，且p需要占满图片右边的空间，并解释原因。
A: 给p设置overflow:hidden，原理是给p生成新的BFC。

11. 如何做水平和垂直居中？给出几种方案。

A: 方案一，已知宽高，设为absolute，然后left、top都设为50%，根据宽高设置负margin来居中；方案二，类似方案一，最后一步用transform: translate(-50%,-50%)；方案三，绝对定位，top、bottom、left、right都设为0，设好宽高，margin设为auto；方案四，display:table-cell + vertical-align:middle。

12. transition、animation、transform有什么区别？

A: transition和animation用来做动画的，transition是从一个状态过度到另一个状态，而animation是按照keyframes来做动画。transform用来做位移和变形的。

## JS
1. 给出如下代码的输出并解释原因：
```
var a = 1;
  
function f() {
    console.log(a);
    var a = 2;
}
  
f();
输出undefined，因为变量定义会提前到函数开头(hoisting)。
```
2. 什么是作用域链(scope chain)？可举例说明。

A: 几个要点：作用域的范围是函数，函数嵌套函数，查找变量从内层函数依次向外层找，最后找不到在window上找。

3. 
```

function A() {
    this.a = 1;
}
  
function B() {
    this.b = 2;
}
```
写出让B原型继承A的代码。
A: B.prototype = new A; 

4. 什么是原型链(prototype chain)？可举例说明。
A: 上一题的例子

var b = new B;
// b.b == 2
// b.a == 1
b.b在b自己的属性上找，b.a自己的属性里没找到则去b的原型即b,__proto__也就是B.prototype里找，一层一层往上找，到null为止，b.__proto__.__proto__是Object.prototype，b.__proto__.__proto__.__proto__为null。

5. 找出以下代码的错误，并改正：
```
function A(a) {
    this.x = a;
  
    var get = function() {
        return this.x;
    }
  
    this.print = function() {
        console.log(get());
    }
}
  
a = new A(1);
a.print();
A: 在print被调用时，get函数里的this为window，有2种改正方法：

    var that = this;
  
    var get = function() {
        return that.x;
    }
或者

var get = function() {
    return this.x;
}.bind(this);
```
6. 解释call、apply、bind的区别，可举例说明。

A: call和apply都是调用一个函数，并指定this和参数，call和apply第一个参数都是指定的this的值，区别在于call第二个参数开始的参数是替换的参数，而apply的第二个参数是一个数组。bind是由一个函数创建一个新函数，并绑定this和部分参数，参数形式和call类似。

7. ajax和jsonp哪个可以跨域，原理是什么？

A: ajax默认无法跨域，xhr2新增的CORS让ajax也可以跨域，需要输出http头(Access-Control-Allow-Origin)。jsonp可以跨域， 原理是script元素的src可以跨域。

8. 描述事件捕获和事件冒泡的顺序。

A: 先从外向内捕获，然后从内向外冒泡。

9. 描述事件委派(delegation)的原理和优点。
A: 原理是在容器节点上绑定事件，利用冒泡，判断事件是否在匹配指定的选择器的节点上被触发。优点是只用绑定一次，不用对每个目标做绑定，还有对动态插入的节点也生效，无需重新绑定。

10. 有哪些触屏事件？
A: touchstart，touchmove，touchend，touchcancel

11. 为什么老版本的webkit的click事件有300ms延迟？

A: 为了支持双击放大，如果300ms以内有两次点击则触发放大操作，而不是click。chromium较新版本在没有双击放大的页面去掉了click事件的300ms延迟。

12. 为什么cookie的容量比localStorage小？

A: 因为cookie会附带在http请求的header里，如果容量大会有性能问题。

13. 描述application cache更新的过程。

A: 第一次访问缓存manifest文件里列的文件，之后访问先加载缓存，在后台加载manifest文件按字节对比看是否有变化，如果没变化则说明缓存未失效，否则在后台按列表更新缓存，在下一次刷新页面的时候使用新的资源。

14. classList和dataset分别是什么？

A: classList类似className，区别是className是空格隔开的字符串，而classList是一个类数组对象，有add、remove、toggle方法。dataset是获取以data-开头的属性的方法。

15. 描述history.pushState的作用。

A: 无刷新的新增一个历史记录，第一个参数是记录绑定的数据，第二个参数是标题(很多浏览器都忽略了)，第三个参数是新的URL。