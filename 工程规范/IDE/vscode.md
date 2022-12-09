## 项目必要插件
### 1. EditorConfig for VS Code

作用：统一不同系统编码格式的不同

需要搭配 .editorconfig 配置文件使用

```
root = true
[*]
indent_style = space
indent_size = 2
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
[*.md]
trim_trailing_whitespace = false
- 举个例子：
CRLF  "\r\n", windows系统环境下的换行方式
LF "\n", Linux系统环境下的换行方式
```

vscode 配置
```
{
  "window.zoomLevel": 1,
  "editor.formatOnSave": false,
  "edenDevelopEnvironment.filterWarnings": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "tabnine.experimentalAutoImports": true,
  "[typescriptreact]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}

```

### 2. ESLint
作用：js代码检测

举个例子：const 变量不可修改提示

### 3. StyleLint
作用：Css 代码检查

## 提升效率
GitLens： 查看文档修改历史


