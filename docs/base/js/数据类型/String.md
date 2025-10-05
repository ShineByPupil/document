### 1. **`String`** <Sound word="String"/>

- `at` <Sound word="at"/>

  > 返回的指定位置的 UTF-16 码元，而不是严格意义上的字符。负整数从后往前取

  ```js
  'A😀𠮷'.at(0) // 'A'
  'A😀𠮷'.at(1) // '\uD83D'
  ```

- `codePointAt` <Sound word="codePointAt"/>

  > 返回指定位置字符的 Unicode 的码点

  ```js
  const str = 'A😀𠮷'
  for (let ch of str) {
    console.log(ch, ch.codePointAt(0))
  }
  // A 65
  // 😀 128512
  // 𠮷 134071
  ```

- `fromCodePoint` <Sound word="fromCodePoint"/>

  > 一个或多个 Unicode 码点生成对应的字符串

  ```js
  String.fromCodePoint(65) // 'A'
  String.fromCodePoint(128512, 134071) // '😀𠮷'
  ```

- `raw` <Sound word="raw"/>

  > 保留字符串里的原始内容

  ```js
  const str1 = String.raw`C:\Development\profile\aboutme.html`
  const str2 = 'C:\\Development\\profile\\aboutme.html'
  str1 === str2 // true
  ```

:::tooltip-map
{
"码元": "存储码点的最小单位",
"码点": "Unicode 为每个字符分配的唯一编号，用来标识字符本身"
}
:::
