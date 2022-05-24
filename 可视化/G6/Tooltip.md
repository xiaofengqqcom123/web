## Tooltip

内置tooltip事件 文档：
https://g6.antv.vision/zh/docs/manual/middle/Plugins/#tooltip

demo：
https://antv-g6.gitee.io/zh/examples/tool/tooltip#tooltipLocalCustom

### 遇到的问题：

1. 需求： 给hover状态的node 中的某shape 添加hover事件~
- hover之后，节点状态改变，无法拿到 具体的shape
- issue：https://github.com/antvis/G6/issues/2016

2. onclick后添加弹框~
demo：https://codesandbox.io/s/cool-sunset-9mqvy?file=/node.js
问题原因：header导致的，将header position 设置为absolute

