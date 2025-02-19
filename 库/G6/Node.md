## Node
https://antv-g6.gitee.io/zh/docs/manual/middle/states/state-new

G6 设定 hover 或 click 节点，造成节点状态的改变，只能自动改变节点的样式属性（如 fill、stroke 等），其他属性（如 type  等）不能被改变。如果需要改变其他属性，要通过  graph.updateItem 手动配置。样式属性是一个名为  style  的对象， style 字段与其他属性并行。
https://antv-g6.gitee.io/zh/docs/manual/tutorial/elements

### 1. nodeStateStyles
defaultNode 方式: 搭配nodeStateStyles， 使用。适用于 默认、hover、click样式调整不大，例如调整fill，stroke等
https://antv-g6.gitee.io/zh/docs/manual/middle/states/state#%E9%85%8D%E7%BD%AE-state-%E6%A0%B7%E5%BC%8F
```
 {
  type: 'circle',
  size: NodeHeight,
  style: {
    fill: '#DDFBFD',
    stroke: '#00BBC8',
    lineWidth: 1,
  },
  type: 'customNode', 
  labelCfg: {
    position: 'right',
    offset: 10,
    style: {
      fill: '#666',
      fontSize: 13,
    },
  },
}
...
    nodeStateStyles: {
        hover: {
            stroke: 'red',
            lineWidth: 2,
        },
    }
```

### 2. 自定义节点

 keyshape：https://antv-g6.gitee.io/zh/docs/manual/middle/elements/shape-keyshape

项目中使用的keyshape：https://antv-g6.gitee.io/zh/docs/manual/middle/elements/nodes/rect

text:https://antv-g6.gitee.io/zh/docs/api/nodeEdge/shapeProperties/#%E6%96%87%E6%9C%AC-text

图形属性：https://antv-g6.gitee.io/zh/docs/api/nodeEdge/shapeProperties/#%E6%96%87%E6%9C%AC-text

### 3. 展开缩起
icon画法：https://antv-g6.gitee.io/zh/examples/item/customNode#card

文档：https://antv-g6.gitee.io/zh/docs/manual/middle/states/defaultBehavior#collapse-expand

涉及到的behavior： https://antv-g6.gitee.io/zh/docs/api/Behavior

自实现demo：https://codesandbox.io/s/musing-cdn-9o37z?file=/Mock.js

> 遇到的问题：
hover状态的节点，从rect移动到 marker icon时，rect的hover转态会消失~ 
为了解决这个问题，我们在rect 与 marker icon之间，新增一个rect

### 4. 节点弹框

上下文弹框：https://antv-g6.gitee.io/zh/examples/tool/contextMenu

需考虑问题
1.  位置不准？
- 坐标问题，直接拿到的x， y 画出来的效果异常 issue：https://github.com/antvis/G6/issues/2017
- 尝试用 mode click-select方式，同样x，y的坐标不准确

2. 给node 的多个shape添加点击事件？
问题：实例中获取不到react变量
https://github.com/antvis/G6/issues/2046
https://github.com/antvis/G6/issues/1391
解决思路：改变model

### 问题
1. 使用setState，更改节点样式，不同状态节点的宽度不同，导致线会存在被遮挡 或 空白太多~ 【done】

issue：https://github.com/antvis/G6/issues/1993
最终放弃了使用setState，使用updateItem

2. 如何对自定义node中的具体一个shape绑定事件？【done】

要用ev.shape.get('name')获取
ev.shape.get('name');
https://github.com/antvis/G6/issues/480

3. 如何获取 node 的state？【done】

场景： 鼠标mouseleave时，判断该节点是否被click过，从而确定node type~
https://g6.antv.vision/zh/docs/manual/middle/states/state-new/#%E6%96%B9%E6%A1%88

4. 如何给node 上的多个shape 分别添加click事件？

方式一：click-select
 问题：这种方式，没有办法给多个shape分别添加~ 只能通过存储变量的方式，存储下点击shape的类型，弹框那里再去判断~ 不优雅
 
方式二： 在node click事件中，拿到点击的shape，分别添加不同的事

