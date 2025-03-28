## 什么是幻影依赖？
> 一个库使用了不属于其 dependencies 中声明的依赖。这个被称为幻影依赖(phantom dependency、幽灵依赖、隐式依赖)

> 例如：
> - 项目里引用了 package A, package A 使用了 lodash 作为依赖，但 lodash 不在项目 dependencies 中声明。此时项目中可以再不声明的情况下，直接使用 loadsh



日常oncall碰到了很多关于pnpm以及幻影依赖的问题，有的问题比较复杂，涉及到了pnpm背后的实现原理，因此本文展开讲一讲pnpm的link机制。
我们通常说pnpm的一大优点就是避免了幻影依赖，默认禁止了hoist，但是当我们说起hoist的时候，说的可能不是一回事，因为pnpm的hoist可能分为很多种情况。而且pnpm禁止不同hoist采取的策略也有所不同。
我们就结合pnpm的link策略来看看不同hoist的表现行为。
在讨论具体的hoist行为前，我们需要先区分两种代码，一种为application code即我们日常开发的业务代码，另一种为vendor code即三方库的代码，也包括三方库自身依赖的三方库。
这时候hoist的不同表现就体现在vendor和application的各种交互上。
因为pnpm@6和pnpm@7存在一些差异，本章讨论都建立在pnpm@7基础上
application与vendor之间的hoist行为(public-hoist)
public-hoist最常见也是我们日常所说的hoist行为。即我们的application code能够访问未声明在application的dependency的里直接依赖的vendor code。
当我们配置pnpm的node-linker为hoisted的情况下，即默认所有的三方库都被hoist。
我们简单看个例子https://github.com/hardfist/explain-pnpm/tree/node-linker， 这里我们虽然只依赖了express这个库，但是仍然可以在src/index.js自由的访问debug这个库，这个正是因为hoist所致。
- 目录结构
node_modules/
  debug
  express
  ...
 src/index.js
 package.json
- package.json
{
  "dependencies": {
    "express": "4.18.1"
  }
}
虽然这带来了一定的便捷性，但是同样带来了很大的危害，具体的危害见 https://rushjs.io/zh-cn/pages/advanced/phantom_deps/此处不再赘述。
对于这类幻影依赖，pnpm默认是严格禁止的，那么是如何做到禁止的呢。方法很简单，只要不将express之外的库直接放置到项目根目录(root)下的node_modules里即可。https://github.com/hardfist/explain-pnpm/tree/node-linker
此时的项目结构如下，我们看到node_modules里已经没有了express之外的库了，这样自然无法在src/index.js里进行访问了。
node_modules/
   express
   .pnpm
src/index.js


## npm 分身 (NPM doppelgangers)
有的情况下，node_modules 里会安装两遍相同的 npm 包，这一现象叫做 npm 分身。

造成的问题是：会造成 node_modules 包体积增大的问题





