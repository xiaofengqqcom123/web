多个css文件时，会存在css重名问题~
### 1. CSS-in-JS
简单来说,传统的前端方案推崇"关注点分离"原则，HTML、CSS、JavaScript 应该各司其职，进行分离。

而在react项目中，更提倡组件化方案，自然形成了将HTML、CSS、JavaScript集中编写管理的方式
多个.css 文件时，会存在“重命名”问题，常见的几种解决方式
```
const Widget = () => {
  <div style={{
      color: 'white',
      fontSize: '12px'
  }} onClick={() => doSometing()}>
    text  
  </div>
}
```
但是这种写法的弊端在于，react中的style仅仅是简单的Object，不支持复杂的嵌套、选择器等特性，使用起来很不方便。 因此，便出现了大量的三方库来进行拓展，这些库统称为css-in-js。它们一般都支持样式嵌套、选择器、主题配置等特性

> 有人专门统计了现有的css-in-js三方库，轮子不要太多： css in js [三方库](http://michelebertoli.github.io/css-in-js/)一览 。比较流行的主要有: styled-components, emotion, glamorous。


#### emotion的用法示例
```
import { css, jsx } from '@emotion/core'

const color = 'white'

render(
  <div
    css={css`
      padding: 32px;
      background-color: hotpink;
      font-size: 24px;
      border-radius: 4px;
      &:hover {
        background-color: ${color};
      }
    `}
  >
    Hover to change color.
  </div>
)
```

### 2. BEM
> [BEM](http://getbem.com/) — Block Element Modifier is a methodology that helps you to create reusable components and code sharing in front-end development

**命名规范**

常规的命名法示例：
```
<div class="article">
    <div class="body">
        <button class="button-primary"></button>
        <button class="button-success"></button>
    </div>
</div>
```
这种写法从 DOM 结构和类命名上可以了解每个元素的意义，但无法明确其真实的层级关系。在 css 定义时，也必须依靠层级选择器来限定约束作用域，以避免跨组件的样式污染。

使用了 BEM 命名方法的示例：
```
<div class="article">
    <div class="article__body">
        <div class="tag"></div>
        <button class="article__button--primary"></button>
        <button class="article__button--success"></button>
    </div>
</div>
```
通过 BEM 命名方式，模块层级关系简单清晰，而且 css 书写上也不必作过多的层级选择。

> 总结: 存在的问题，calss name 太长

### 3. Css module

[阮大大文章](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)