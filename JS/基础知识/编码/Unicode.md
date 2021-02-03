JavaScript 使用 Unicode 编码 （Unicode encoding）对字符串进行编码。大多数字符使用 2 个字节编码，但这种方式只能编码最多 65536 个字符。

这个范围不足以对所有可能的字符进行编码，这就是为什么一些罕见的字符使用 4 个字节进行编码，比如 𝒳 （数学符号 X）或者 😄 （笑脸），一些象形文字等等。

很久以前，当 JavaScript 被发明出来的时候，Unicode 的编码要更加简单：当时并没有 4 个字节长的字符。所以，一部分语言特性在现在仍旧无法对 unicode 进行正确的处理。
```
alert('😄'.length); // 2
alert('𝒳'.length); // 2

'𝒳'.match(/^[\w\W]{1}$/) //null
'𝒳'.match(/^[\w\W]{2}$/) // ["𝒳", index: 0, input: "𝒳", groups: undefined]
```