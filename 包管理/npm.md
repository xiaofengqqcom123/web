### 1. npm && npx
```
NPM - Manages packages but doesn't make life easy executing any.
NPX - A tool for executing Node packages.

NPX comes bundled with NPM version 5.2+

NPM by itself does not simply run any package. it doesn't run any package in a matter of fact. If you want to run a package using NPM, you must specify that package in your package.json file.

When executables are installed via NPM packages, NPM links to them:

local installs have "links" created at ./node_modules/.bin/ directory.
global installs have "links" created from the global bin/ directory (e.g. /usr/local/bin) on Linux or at %AppData%/npm on Windows.

```

【参考文档】

[Difference between npx and npm?](https://stackoverflow.com/questions/50605219/difference-between-npx-and-npm)

### node-gyp
node-gyp: gyp其实是一个用来生成项目文件的工具，一开始是设计给chromium项目使用的，后来大家发现比较好用就用到了其他地方。生成项目文件后就可以调用GCC, vsbuild, xcode等编译平台来编译