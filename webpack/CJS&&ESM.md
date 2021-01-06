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

### ESM and CJS different ？
- 加载方式:In CommonJS, require() is synchronous; In ESM, the module loader runs in asynchronous phases;
- ESM scripts use Strict Mode by default (use strict), their this doesn't refer to the global object, scoping works differently, etc. 
```
This is why, even in browsers, <script> tags are non-ESM by default; you have to add a type="module" attribute to opt into ESM mode.
```

### CJS 引用 EMS
#### 1. CJS can’t require() ESM because of top-level await
- Top-level await is limited to [ESM] modules. There is explicitly no support for scripts or for CommonJS modules.
```
The stage 3 version of the proposal directly addresses these issues:
• As siblings are able to execute, there is no definitive blocking.
• Top-level await occurs during the execution phase of the module graph. At this point all resources have already been fetched and linked. There is no risk of blocking fetching resources.
• Top-level await is limited to [ESM] modules. There is explicitly no support for scripts or for CommonJS modules.
```

Since CJS doesn’t support top-level await, it’s not even possible to transpile ESM top-level await into CJS. How would you rewrite this code in CJS?
```
export const foo = await fetch('./data.json');
```
It’s frustrating, because the vast majority of ESM scripts don’t use top-level await

#### 2. CJS Can import() ESM, but It’s Not Great
For now, if you’re writing CJS and you want to import an ESM script, you’ll have to use asynchronous dynamic import().
```
(async () => {
    const {foo} = await import('./foo.mjs');
})();

module.exports.foo = (async () => {
    const {foo} = await import('./foo.mjs');
    return foo;
})();
```



### ESM can’t import named CJS exports unless CJS scripts execute out of order
You can do this:
```
import _ from './lodash.cjs'
```
But you can’t do this:
```
import {shuffle} from './lodash.cjs'
```

That’s because CJS scripts compute their named exports as they execute, whereas ESM’s named exports must be computed during the parsing phase.
Fortunately for us, there’s a workaround! The workaround is annoying, but totally doable. We just have to import CJS scripts like this:
```
import _ from './lodash.cjs';
const {shuffle} = _;
```

### Out-of-order execution would work, but it might be even worse
A number of people have proposed executing CJS imports before ESM imports, out of order. That way, the CJS named exports could be computed at the same time as ESM named exports.

Out-of-order execution is still under debate, though the conversation seems to have mostly fizzled out a few weeks ago.