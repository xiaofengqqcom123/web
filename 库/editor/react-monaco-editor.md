## 使用
[入门指南](https://github.com/react-monaco-editor/react-monaco-editor)

### 什么是Monaco Editor？
微软之前有个项目叫做Monaco Workbench，后来这个项目变成了VSCode，而Monaco Editor（下文简称monaco）就是从这个项目中成长出来的一个web编辑器，他们很大一部分的代码（monaco-editor-core）都是共用的，所以monaco和VSCode在编辑代码，交互以及UI上几乎是一摸一样的，有点不同的是，两者的平台不一样，monaco基于浏览器，而VSCode基于electron，所以功能上VSCode更加健全，并且性能比较强大. 但不支持移动端浏览器

### [基本使用](https://microsoft.github.io/monaco-editor/)
**Rich IntelliSense, Validation**

TypeScript, JavaScript, CSS, LESS, SCSS, JSON, HTML
**Basic Syntax Colorization**

XML, PHP, C#, C++, Razor, Markdown, Diff, Java, VB, CoffeeScript, Handlebars, Batch, Pug, F#, Lua, Powershell, Python, Ruby, SASS, R, Objective-C

- 支持 code diff [示例](https://codepen.io/coltpini/pen/rJKNwg)

### 1. 搭配 monaco-editor-webpack-plugin 使用
A plugin to simplify loading the Monaco Editor with webpack.

- 自动注入getWorkerUrl全局变量
- 处理worker的编译配置
- 自动引入控件和语言包

### 2. 开发需求
#### 1. 插入文本
**需求：** 在当前鼠标的位置插入指定文本的代码如下。如果你已经选定了一段代码的话，应该会替换当前选中的文本

[接口文档](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.icodeeditor.html#executeedits)

```
   import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

   ...
   const monacoEditorRef = React.createRef()
   ...
   const insertContent =  (text) => {
      const editor = monacoEditorRef.current.editor
      const p = editor.getPosition()
      editor.executeEdits('',
      [
        {
          range: new monaco.Range(p.lineNumber,
            p.column,
            p.lineNumber,
            p.column),
          text: text
        }
      ]
    )
    }

    return (
        <div>
            <div onClick={() => insertContent('你说呢，美女？')} >插入文本</div>
            <MonacoEditor
                width="100%"
                height="600"
                language="sql"
                value={code}
                theme="vs-dark"
                options={options}
                onChange={onChange}
                editorDidMount={editorDidMount}
                ref={monacoEditorRef}
            />
        </div>
      )  
```



【参考】
- [闲谈Monaco Editor-基本使用](https://juejin.im/entry/6844903711181897735)
- [编辑器计算框在光标位置插入文本解决方案](https://www.codenong.com/jsb4c92f63c08e/)
- [How do I insert text into a Monaco Editor?](https://stackoverflow.com/questions/41642649/how-do-i-insert-text-into-a-monaco-editor)