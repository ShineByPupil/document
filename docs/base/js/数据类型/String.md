### 1. **`String`** <Sound word="String"/>

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

:::tooltip-map
{
"码点": "Unicode 为每个字符分配的唯一编号，用来标识字符本身"
}
:::
