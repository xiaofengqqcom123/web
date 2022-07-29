[Why should we use pnpm?](https://medium.com/pnpm/why-should-we-use-pnpm-75ca4bfe7d93)

### 背景
#### 1. npm 中存在的问题

NPM 中用到的方法与传统的包管理方式有很多不同点：

- 每一个（根级）目录的 node_module 树来存储大量的库文件夹副本，甚至一个很小的 NodeJS 项目的文件夹下可能有超过 10,000 个文件。

- 在 NPM 2.x 版本中，node_modules 文件树非常深，而且存在很多重复，这可以消除换依赖。NPM 3.x 的安装算法改成了将树扁平化，这消除了大量重复想，但代价是引入了幻影依赖，在某些情况下这个新算法会选择一个更久的版本的包（虽然依旧符合语义化规范）来消除包文件夹的重复。

- 安装后的 node_modules 树并不唯一，有很多种可能来重新组织文件夹来使得其接近菱形，并没有独一无二的“标准化”排列。安装后的树依赖于你的包管理器使用了哪种算法，NPM 自身的算法甚至对你添加的包的次序有关

文档：https://rushjs.io/zh-cn/pages/advanced/phantom_deps/

#### 2. 幻影依赖
**a. application与vendor之间的hoist行为(public-hoist)**

 public-hoist最常见也是我们日常所说的hoist行为。即我们的application code能够访问未声明在application的dependency的里直接依赖的vendor code。

 举例说明：
- 目录结构
```
node_modules/
  debug
  express
  ...
 src/index.js
 package.json
```
- package.json
```
{
  "dependencies": {
    "express": "4.18.1"
  }
}
```
- src/index.tsx
```
const debug = require('debug');
console.log(debug);
```

对于这类幻影依赖，pnpm默认是严格禁止的，那么是如何做到禁止的呢。方法很简单，只要不将express之外的库直接放置到项目根目录(root)下的node_modules里即可。

```
node_modules/
   express
   .pnpm
src/index.js
```
但是因为prettier和eslint的相关设计缺陷，导致其经常强依赖其相关的plugin存放在项目根目录的node_modules里，因此pnpm默认并没有禁止所有的库的hoist行为，而是给eslint和prettier开了后门。

默认值见: https://pnpm.io/npmrc#public-hoist-pattern。

**b. vendor与vendor的hoist行为(hoist)**

vendor和vendor的hoist是指，一个三方库可以访问不在其依赖里的其他三方库代码，这听起来有点不可思议，既然一个库用到了某个依赖，那理所当然应当将其列入其依赖，否则这个库肯定跑不起来啊，然而不幸的是，仍然有大量的三方库，没遵守这个约定。
以webpack-cli为例，其虽然依赖了ts-node等来将ts配置文件翻译为js，但是其并没有将ts-node列入到其dependency和peer-dependency里，这里存在的一个风险就是，如果你之前恰好安装了webpack-cli和另一个库A且另一个库A正好又依赖了ts-node,并且你的webpack配置文件使用了ts文件，那么你很幸运的能够将webpack跑起来，突然有一天库A决定不使用ts-node作为依赖，那么不幸的是你的webpack将无法正常编译。

虽然有这种潜在的风险，奈何整个js的生态库都良莠不齐，导致pnpm也只能默认开启hoist模式，默认所有的vendor都是可以互相蹭的。你如果比较有追求，可以通过设置https://pnpm.io/npmrc#hoist 为false,关闭三方库的vendor的hoist行为。

### pnpm
#### systemlink vs hardlink
