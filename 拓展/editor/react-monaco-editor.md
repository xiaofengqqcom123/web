 ### 使用
[入门指南](https://github.com/react-monaco-editor/react-monaco-editor)

#### 什么是Monaco Editor？
微软之前有个项目叫做Monaco Workbench，后来这个项目变成了VSCode，而Monaco Editor（下文简称monaco）就是从这个项目中成长出来的一个web编辑器，他们很大一部分的代码（monaco-editor-core）都是共用的，所以monaco和VSCode在编辑代码，交互以及UI上几乎是一摸一样的，有点不同的是，两者的平台不一样，monaco基于浏览器，而VSCode基于electron，所以功能上VSCode更加健全，并且性能比较强大

#### 1. monaco-editor-webpack-plugin
- 自动注入getWorkerUrl全局变量
- 处理worker的编译配置
- 自动引入控件和语言包

webpack.config.js
```
  const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
  ...
  plugins: [
    new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ['sql']
    }),
  ]
   
```

#### 2. 自定义提示

以sql为例，实现sql语法自定义提示
 ```
   // 为该语言注册一个语言提示器
  function editorDidMount(editor, monaco) {

      editor.focus();

      // 提示类型
      const COMPLETION_TYPE = {
        [SQL_SUGGESTION_TYPE.function]: monaco.languages.CompletionItemKind.Function,
        [SQL_SUGGESTION_TYPE.keyword]: monaco.languages.CompletionItemKind.Keyword,
        [SQL_SUGGESTION_TYPE.field]: monaco.languages.CompletionItemKind.Field,
        [SQL_SUGGESTION_TYPE.database]: monaco.languages.CompletionItemKind.Function, // 未找到 数据库 独有的 提示标识，暂定与function 相同
      }
      //提示项设值
      monaco.languages.registerCompletionItemProvider('sql', {
        provideCompletionItems(model, position) {
          console.log('model, position', model, position)
          const word = model.getWordUntilPosition(position)

          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          }
          return {
            suggestions: [{
              insertText: "SUM",
              kind: COMPLETION_TYPE.keyword,
              label: 'Skeyword',
              range,
            }, {
              insertText: "SUM",
              kind: COMPLETION_TYPE.function,
              label: 'Sfunction',
              range,
            }, {
              insertText: "SUM",
              kind: COMPLETION_TYPE.field,
              label: 'sfield',
              range,
            }],
          }
        },
        triggerCharacters: [' ', '.'],
      });
    }

    return (
      <div>
        <MonacoEditor
          width="100%"
          height="600"
          language="sql"
          value={code}
          theme="vs-dark"
          options={options}
          onChange={onChange}
          editorDidMount={editorDidMount}
        />
      </div>
    ) 
```
#### 插入文本
**需求：** 在当前鼠标的位置插入指定文本的代码如下。如果你已经选定了一段代码的话，应该会替换当前选中的文本
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