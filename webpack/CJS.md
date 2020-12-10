本文主要讲述 CJS、ES之间的差异~

### What’s CJS? What’s ESM?
#### CJS
Here’s a CJS example using named exports, where util.cjs has an export named sum.
```
// @filename: util.cjs
module.exports.sum = (x, y) => x + y;
// @filename: main.cjs
const {sum} = require('./util.cjs');
console.log(sum(2, 4));
```
Here’s a CJS example where util.cjs sets a default export. The default export has no name; modules using require() define their own name.
```
// @filename: util.cjs
module.exports = (x, y) => x + y;
// @filename: main.cjs
const whateverWeWant = require('./util.cjs');
console.log(whateverWeWant(2, 4));
```

#### ES 
In ESM scripts, import and export are part of the language; like CJS, they have two different syntaxes for named exports and the default export.
Here’s an ESM example with named exports, where util.mjs has an export named sum.
```
// @filename: util.mjs
export const sum = (x, y) => x + y;
// @filename: main.mjs
import {sum} from './util.mjs'
console.log(sum(2, 4));
```
Here’s an ESM example where util.mjs sets a default export. Just like in CJS, the default export has no name, but the module using import defines its own name.
```
// @filename: util.mjs
export default (x, y) => x + y;
// @filename: main.mjs
import whateverWeWant from './util.mjs'
console.log(whateverWeWant(2, 4));
```

#### 区别
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。
