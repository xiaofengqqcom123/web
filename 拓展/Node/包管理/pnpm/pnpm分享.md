# 前置知识

## 文件存储结构
文件数据存储在硬盘上，操作系统存取硬盘的最小单位为 block，一般大小是 4 KB。在操作系统中还有一个地方储存文件的元信息，比如文件的创建者、文件的创建日期、文件的大小等等。这种储存文件元信息的区域就叫做 inode（index node），block 和 inode 的关系如下：

<img src="./assets/文件存储.PNG" style="width: 300px">

## inode 区域主要信息
1. 文件的字节数
2. 文件拥有者的 User ID
3. 文件的 Group ID
4. 文件的读、写、执行权限
5. 文件的时间戳，共有三个：ctime 指 inode 上一次变动的时间，mtime 指文件内容上一次变动的时间，atime 指文件上一次被访问的时间
6. 链接数，即有多少文件名指向这个 inode
7. 文件数据 block 的位置

## 硬链接
一般情况下，文件名和 inode 号码是“一一对应”关系，每个 inode 号码对应一个文件名。但是，Unix/Linux 等系统允许多个文件名指向同一个 inode 号码，每个文件名都代表一个硬链接。 

<img src="./assets/硬链.PNG" style="width: 300px">

<div style="background - color: lightgreen;">

    - 文件的原始文件名本质上也是一个硬链接。

    - 系统采用引用计数的策略判断文件是否需要删除，当硬链接数量为 0 时，该文件则会被删除。

</div>

### 软链接（符号链接）
软链接类似于 Windows 的快捷方式。它实际上是一个特殊的文本文件。在软链接中，文件的 block 包含另一文件的位置信息，所以通过软链接可以找到它指向的文件。

<img src="./assets/软链.PNG" style="width: 300px">

### 包管理的痛点
场景带入，以 express 源码库为例，项目中依赖了两个包 send 和 debug，debug 依赖 ms@2.0.0，而 send 依赖 ms@2.1.3，npm 该如何安装 node_modules 中的依赖。
<img src="./assets/node_modules hell.PNG" style="width: 400px">

#### npm 1-2
npm1 和 npm2 采取的方法简单粗暴，直接在 node_modules 生成层层嵌套的结构，有多少层依赖就嵌套多少层。
```
1. express/node_modules
2. |-- debug@2.6.9
3. |   |-- node_modules
4. |   |   |-- ms@2.0.0
5. |-- send@0.18.0
6. |   |-- node_modules
7. |   |   |-- ms@2.1.3
```
1. **node_modules hell**
这样做看似可以，但是存在一个很严重问题，如果你的应用有很多的第三方库，同时第三方库共同依赖了一些很基础的第三方库如 lodash，你会发现你的 node_modules 里充满了各种重复版本的 lodash，造成了极大的空间浪费，也导致 npm install 很慢，这既是臭名昭著的 node_modules hell。 

### npm 3+ & yarn
npm3 以上版本和 yarn 采取了 hoist 机制，将公共包提取到顶层的 node_modules 里，如果一个包的子依赖与顶层 node_modules 版本不兼容，才会创建子级 node_modules 并安装所需依赖，这样可以实现大多数依赖的复用，node_modules 呈现一种相对扁平的结构。
```
1. express/node_modules
2. |-- debug@2.6.9
3. |-- send@0.18.0
4. |   |-- node_modules
5. |   |   |-- ms@2.1.3
6. |-- ms@2.0.0
```
这时我们看似解决了 node_modules hell，但是还存在以下问题...
1. **不确定性**
npm 是根据安装顺序来决定是否把包放在顶层的 node_modules 中的，如上图，debug 先于 send 安装，所以 debug 依赖的 ms@2.0.0 安装在顶层 node_modules 中，而 send 依赖的 ms@2.1.3 则只能安装在它内部的 node_modules 中，所以我们并没有一个很有效的手段来控制顶层依赖的版本。有时会出现错误的版本 hoist 到顶层 node_modules 中，这种现象会引起版本冲突问题。

2. **doppelgangers**
如果此时又有一个 xmodule 依赖的是 ms@2.1.3，那么还是会造成同一个版本重复安装的问题。
```
1. express/node_modules
2. |-- debug@2.6.9
3. |-- send@0.18.0
4. |   |-- node_modules
5. |   |   |-- ms@2.1.3
6. |-- xmodule@x.x.x
7. |   |-- node_modules
8. |   |   |-- ms@2.1.3
9. |-- ms@2.0.0
```
这个问题在 monorepo 中尤为明显，以 yuntu_standard-monorepo 为例，多个子应用依赖了的 react - query@3.24.5，但是顶层的 node_modules 版本为 react - query@3.24.4，所以子应用内部还是分别安装了 react - query@3.24.5。 

<img src="./assets/实例.jpg" style="width: 200px">

3、**phantom dependency**
hoist 机制导致大量子依赖包被提取到 node_modules 顶层，我们可以引入 dependencies 之外的包，这种现象称为 phantom depdencies 。当我们使用 monorepo 管理项目的情况下，问题更加严重，一个 package 不但可能引入 DevDependency 引入的 phantom 依赖，更很有可能引入其他 package 的依赖，使用不可控的依赖有可能会产生 bug。 

# Pnpm：高效的包管理工具

## Pnpm 命令行工具（Cli）
Pnpm 的使用方式与 npm 极为相似，详细信息可查阅官方文档。需留意的是，Pnpm 会对所有参数进行校验。例如，执行 `pnpm install --target_arch x64` 将会失败，原因是 `--target_arch x64` 并非 `pnpm install` 的有效参数。

## Pnpm 的包管理机制
Pnpm 的核心特性如下：
- **全局存储与模块共享**：Pnpm 创建一个全局 store，用于存放所有下载的包。项目借助硬链接调用 store 中的模块，实现了模块的全局共享，有效解决 `node_modules hell` 问题。
- **依赖引用控制**：Pnpm 项目仅能引用 `dependencies` 中声明的依赖，禁止引用子依赖，从而解决了 `phantom dependency` 问题。
- **拓扑结构维护**：Pnpm 项目通过软链接维护 `node_modules` 的嵌套拓扑结构，确保了依赖的确定性。

举例来说，当执行 `pnpm install express` 时，`node_modules` 将生成如下目录结构。 （此处原图片有图示但文字描述未完整提及图示内容，可根据实际情况补充或进一步说明图示含义 ） 
