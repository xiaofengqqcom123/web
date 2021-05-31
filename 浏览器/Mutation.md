## Mutation observer
MutationObserver 是一个内建对象，它观察 DOM，并在监测到更改时触发回调。

### 1. 语法
```
<!-- 创建观察器 -->
let observer = new MutationObserver(callback);

<!-- 附加到DOM节点 -->
observer.observe(node, config);
```

### 2. 应用场景
【举例】

a. 用于集成

想象一下，你需要添加一个第三方脚本，该脚本不仅包含有用的功能，还会执行一些我们不想要的操作，例如显示广告 \<div class="ads">Unwanted ads\</div>。

当然，第三方脚本没有提供删除它的机制。

使用 MutationObserver，我们可以监测到我们不需要的元素何时出现在我们的 DOM 中，并将其删除。

还有一些其他情况，例如第三方脚本会将某些内容添加到我们的文档中，并且我们希望检测出这种情况何时发生，以调整页面，动态调整某些内容的大小等。
