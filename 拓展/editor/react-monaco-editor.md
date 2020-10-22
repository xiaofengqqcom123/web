 ### 使用
[入门指南](https://github.com/react-monaco-editor/react-monaco-editor)

#### 1. monaco-editor-webpack-plugin
- 自动注入getWorkerUrl全局变量
- 处理worker的编译配置
- 自动引入控件和语言包

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


【参考】
- [闲谈Monaco Editor-基本使用](https://juejin.im/entry/6844903711181897735)