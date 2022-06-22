## npm 中的 peer-dependencies
> [node 文档](https://nodejs.org/uk/blog/npm/peer-dependencies/)
#### peer-dependencies 能做什么？
下面是个人理解，依赖的包可以向上提一级。举例来说：项目使用的ui 库为antd, antd 的 peer-dependencies 为 react，则 react 向上提一级，安装在根目录的 node_moudules 文件下


#### 支持的版本
One piece of advice: peer dependency requirements, unlike those for regular dependencies, should be lenient. You should not lock your peer dependencies down to specific patch versions. It would be really annoying if one Chai plugin peer-depended on Chai 1.4.1, while another depended on Chai 1.5.0, simply because the authors were lazy and didn't spend the time figuring out the actual minimum version of Chai they are compatible with.

The best way to determine what your peer dependency requirements should be is to actually follow semver. Assume that only changes in the host package's major version will break your plugin. Thus, if you've worked with every 1.x version of the host package, use "~1.0" or "1.x" to express this. If you depend on features introduced in 1.5.2, use ">= 1.5.2 < 2".

简而言之，应当宽容，不应该写死版本, 可以写成 ~1.0 

## pnpm 中的 peer
> - [基于符号链接的 node_modules 结构](https://pnpm.io/zh/symlinked-node-modules-structure) 建议先看下这篇文章
> - [peers 是如何被处理的](https://pnpm.io/zh/how-peers-are-resolved)

peer 依赖项（peer dependencies）会从依赖图中更高的已安装的依赖项中解析（resolve），因为它们与父级共享相同的版本。 这意味着，如果 foo@1.0.0 有两个peers依赖（bar@^1 和 baz@^1），那么它可能在一个项目中有多个不同的依赖项集合。
```
- foo-parent-1
  - bar@1.0.0
  - baz@1.0.0
  - foo@1.0.0
- foo-parent-2
  - bar@1.0.0
  - baz@1.1.0
  - foo@1.0.0
```

在上面的示例中， foo@1.0.0 已安装在 foo-parent-1 和 foo-parent-2 中。 这两个包（package）都同样有 bar 和 baz，但它们依赖不同版本的 baz。 因此， foo@1.0.0 有两组不同的依赖项：一组具有 baz@1.0.0 ，另一组具有 baz@1.1.0。 若要支持这些用例，pnpm 必须有几组不同的依赖项，就去硬链接几次 foo@1.0.0。

通常，如果一个package没有 peer 依赖项（peer dependencies），它会被硬链接到其依赖项的软连接（symlinks）旁的 node_modules，就像这样：
```
node_modules
└── .pnpm
    ├── foo@1.0.0
    │   └── node_modules
    │       ├── foo
    │       ├── qux   -> ../../qux@1.0.0/node_modules/qux
    │       └── plugh -> ../../plugh@1.0.0/node_modules/plugh
    ├── qux@1.0.0
    ├── plugh@1.0.0
```
但是，如果 foo 有 peer 依赖（peer dependencies），那么它可能就会有多组依赖项，所以我们为不同的 peer 依赖项创建不同的解析：
```
node_modules
└── .pnpm
    ├── foo@1.0.0_bar@1.0.0+baz@1.0.0
    │   └── node_modules
    │       ├── foo
    │       ├── bar   -> ../../bar@1.0.0/node_modules/bar
    │       ├── baz   -> ../../baz@1.0.0/node_modules/baz
    │       ├── qux   -> ../../qux@1.0.0/node_modules/qux
    │       └── plugh -> ../../plugh@1.0.0/node_modules/plugh
    ├── foo@1.0.0_bar@1.0.0+baz@1.1.0
    │   └── node_modules
    │       ├── foo
    │       ├── bar   -> ../../bar@1.0.0/node_modules/bar
    │       ├── baz   -> ../../baz@1.1.0/node_modules/baz
    │       ├── qux   -> ../../qux@1.0.0/node_modules/qux
    │       └── plugh -> ../../plugh@1.0.0/node_modules/plugh
    ├── bar@1.0.0
    ├── baz@1.0.0
    ├── baz@1.1.0
    ├── qux@1.0.0
    ├── plugh@1.0.0
```
我们创建 foo@1.0.0_bar@1.0.0+baz@1.0.0 或foo@1.0.0_bar@1.0.0+baz@1.1.0内到foo的软链接。 因此，Node.js 模块解析器将找到正确的 peers。