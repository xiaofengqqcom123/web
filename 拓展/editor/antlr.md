## AnTLR
ANTLR 是一款功能强大的开源解析器生成器，包含了词法分析,语法分析两大模块的工具，并且提供了大量主流语言的现成的语法描述grammar文件, 包括但不限于 Java、C#、Python、JavaScript、TypeScript、C++、Go 等.  广泛应用于编译器开发、解释器构建、数据提取和转换、语法分析等多个领域。


使用antlr你可以将某种语言的代码文件，以纯文本字符串的方式输入，被antlr整理分析成一个语法树，一个可以清晰地从树状结构里，看到代码真正的逻辑的结构化数据

- 解析器生成：ANTLR 可以根据用户提供的语法规则自动生成词法分析器（Lexer）和语法分析器（Parser）。这些生成的分析器能够将输入的文本流解析为抽象语法树（AST）或解析树（Parse Tree），为后续的语义分析、代码生成等提供基础
- 语法错误处理：ANTLR 提供了完善的错误处理机制，可以在解析过程中捕获并报告语法错误，帮助开发者及时发现并修复代码中的问题
- 可视化工具：ANTLR 提供了可视化工具，如 ANTLRWorks、ANTLR4 GUI 等，可以帮助开发者直观地查看生成的解析器的结构和工作原理，提高开发效率
- 社区支持：ANTLR 拥有活跃的社区和丰富的资源，包括官方网站、用户论坛、GitHub 仓库等，可以帮助开发者获取及时的帮助和支持
### 使用
#### 语法
以Bbcode.g4 为例
<img src="./assets/antlrGrammer.png">

#### antlr4ts Getting started

1. Install antlr4ts as a runtime dependency using your preferred package manager.
```
npm install antlr4ts --save 
或
yarn add antlr4ts
```
2. Install antlr4ts-cli as a development dependency using your preferred package manager.
```
npm install antlr4ts-cli --save-dev
或
yarn add -D antlr4ts-cli
```
3. 生成语法包
- Add a grammar to your project, e.g. path/to/MyGrammar.g4

- Add a script to package.json for compiling your grammar to TypeScript

```
"scripts": {
  // ...
  "antlr4ts": "antlr4ts -visitor path/to/MyGrammar.g4"
}
```
4. 使用
- Use your grammar in TypeScript
```
import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';

// Create the lexer and parser
let inputStream = new ANTLRInputStream("text");
let lexer = new MyGrammarLexer(inputStream);
let tokenStream = new CommonTokenStream(lexer);
let parser = new MyGrammarParser(tokenStream);

// Parse the input, where `compilationUnit` is whatever entry point you defined
let result = parser.compilationUnit();
```

> 为什么要用antlr4ts, 而不是直接用antlr. 事实上antlr4ts只是antlr的ts运行时实现, antlr4默认支持 java, c#, go, python等运行时. 也就是我们可以用其他语言解析grammar. 但是生成其他语言的lexer, parser等需要antlr4 tool (这是由java写的)

#### antlr4 
以 sql 为例，[sql grammer](https://forcedotcom.github.io/phoenix/index.html)


【参考】
- [Getting Started with ANTLR v4](https://github.com/antlr/antlr4/blob/master/doc/getting-started.md)
- [从antlr扯淡到一点点编译原理](https://awhisper.github.io/2016/11/18/%E4%BB%8Eantlr%E5%88%B0%E8%AF%AD%E6%B3%95%E8%A7%A3%E6%9E%90/)
- [使用antlr4构造我的语法树](https://cloud.tencent.com/developer/article/1571188)
[antlr4ts - TypeScript/JavaScript target for ANTLR 4](https://www.npmjs.com/package/antlr4ts/v/0.5.0-alpha.2)
[使用antlr4, 用ts/js还原protobuf生成的java代码为pb (一)](https://www.jianshu.com/p/e54011f407e9)
[antlr4 for javascript github](https://github.com/antlr/antlr4/blob/master/doc/javascript-target.md)