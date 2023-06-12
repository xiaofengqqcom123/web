### 背景
npm 7 有一些新特性，其中之一是：自动安装 peerdendency. 在项目开发开发中，使用 npm7 安装包时，经常遇到冲突，例如：
<img src="./assets/npm7.jpeg"/>

其中最优解，解决包之间的依赖版本冲突，如果依赖的三方库，我们更改不了依赖时，怎么处理呢？

### --force vs --legacy-peer-deps
[npm: When to use `--force` and `--legacy-peer-deps`](https://stackoverflow.com/questions/66020820/npm-when-to-use-force-and-legacy-peer-deps)
#### --legacy-peer-deps
> --legacy-peer-deps: ignore all peerDependencies when installing, in the style of npm version 4 through version 6.

#### --force
The -f or --force argument will force npm to fetch remote resources even if a local copy exists on disk.