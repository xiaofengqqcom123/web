## npm 中的 peer-dependencies
> [node 文档](https://nodejs.org/uk/blog/npm/peer-dependencies/)
#### peer-dependencies 能做什么？
下面是个人理解，依赖的包可以向上提一级。举例来说：项目使用的ui 库为antd, antd 的 peer-dependencies 为 react，则 react 向上提一级，安装在根目录的 node_moudules 文件下


#### 支持的版本
One piece of advice: peer dependency requirements, unlike those for regular dependencies, should be lenient. You should not lock your peer dependencies down to specific patch versions. It would be really annoying if one Chai plugin peer-depended on Chai 1.4.1, while another depended on Chai 1.5.0, simply because the authors were lazy and didn't spend the time figuring out the actual minimum version of Chai they are compatible with.

The best way to determine what your peer dependency requirements should be is to actually follow semver. Assume that only changes in the host package's major version will break your plugin. Thus, if you've worked with every 1.x version of the host package, use "~1.0" or "1.x" to express this. If you depend on features introduced in 1.5.2, use ">= 1.5.2 < 2".

简而言之，应当宽容，不应该写死版本, 可以写成 ~1.0 

## pnpm 中的 peer
> [peers 是如何被处理的](https://pnpm.io/zh/how-peers-are-resolved)