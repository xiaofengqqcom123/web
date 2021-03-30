https://zh.javascript.info/browser-environment

JavaScript 语言最初是为 Web 浏览器创建的。此后，它已经发展成为一种具有多种用途和平台的语言。

平台可以是一个浏览器，一个 Web 服务器，或其他 主机（host），甚至可以是一个“智能”咖啡机，如果它能运行 JavaScript 的话。它们每个都提供了特定于平台的功能。JavaScript 规范将其称为 主机环境。

主机环境提供了自己的对象和语言核心以外的函数。Web 浏览器提供了一种控制网页的方法。Node.JS 提供了服务器端功能，等等。

JavaScript 在浏览器中运行时的鸟瞰示意图：

<img src="./assets/windowObjects.svg">

有一个叫做 window 的“根”对象:
- BOM(Browser Object Model): 用于处理文档（document）之外的所有内容的其他对象。其中包括: navigator对象(提供了有关浏览器和操作系统的背景信息)、location、alert/confirm/prompt(它代表了与用户通信的纯浏览器方法).HTML 规范中的一部分
- DOM(Document Object Model): 将所有页面内容表示为可以修改的对象, 不仅用于浏览器，服务器端脚本也可以使用 DOM
- CSSOM(CSS Object Model)
- JavaScript