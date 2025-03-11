# Web Crypto API

Web Crypto API （发音 `/ˈkrɪptəʊ/`）提供了一套关于密码学原语的接口

## 前言

- 关于前端浏览器加密API的信息不全，甚至语言模型都是错误的，因此实践并整理文档和示例。
- js有能力加密敏感信息

## 环境

- 只有在https或localhost环境下运行。http环境下会报错，未加密的通信容易被截取和篡改
- 直接使用window对象调用crypto对象属性，Crypto不能实例化新的对象，甚至Crypto.prototype原型对象的方法也不能直接调用

## 单词

- `crypto` /ˈkrɪptəʊ/ _n. 密码学_
- `subtle` /ˈsʌt(ə)l/ _adj. 隐秘的_
- `encrypt` /ɪnˈkrɪpt/ _v. 把……加密_
- `decrypt` /diːˈkrɪpt/ _vt. 解密码_
- `algorithm` /ˈælɡərɪðəm/ _n.（尤指计算机）算法，运算法则_

## 属性 & 方法

- `crypto`
  - `subtle`
    - [`decrypt()`](#windowcryptosubtledecrypt) 解密数据
    - `deriveBits()`
    - `deriveKey()`
    - `digest()`
    - [`encrypt()`](#windowcryptosubtleencrypt) 加密数据
    - `exportKey()`
    - `generateKey()`
    - [`importKey()`](#windowcryptosubtleimportKey) 生成 CryptoKey 秘钥对象
    - `sign()`
    - `unwrapKey()`
    - `verify()`
    - `wrapKey()`
  - `getRandomValues()`
  - `randomUUID()`

<details>
<summary>公共的类型定义</summary>

```ts
type AlgorithmIdentifier = Algorithm | string

// RSA-OAEP
interface RsaOaepParams extends Algorithm {
  label?: BufferSource
}

// AES-CTR
interface AesCtrParams extends Algorithm {
  counter: BufferSource
  length: number
}

// ES-CBC
interface AesCbcParams extends Algorithm {
  iv: BufferSource
}

// AES-GCM
interface AesGcmParams extends Algorithm {
  additionalData?: BufferSource
  iv: BufferSource
  tagLength?: number
}

// 秘钥对象
interface CryptoKey {
  readonly algorithm: KeyAlgorithm
  readonly extractable: boolean
  readonly type: KeyType
  readonly usages: KeyUsage[]
}

type BufferSource = ArrayBufferView | ArrayBuffer
type Exclude<T, U> = T extends U ? never : T
type KeyFormat = 'jwk' | 'pkcs8' | 'raw' | 'spki'
type KeyUsage =
  | 'decrypt'
  | 'deriveBits'
  | 'deriveKey'
  | 'encrypt'
  | 'sign'
  | 'unwrapKey'
  | 'verify'
  | 'wrapKey'
```

</details>

### window.crypto.subtle.decrypt

```ts
interface SubtleCrypto {
  /**
   * 使用指定的算法和密钥解密数据。
   *
   * @param algorithm - 用于解密的算法。可以是字符串或指定算法详细信息的对象。
   * @param key - 用于解密的密钥。必须是 CryptoKey 对象。
   * @param data - 要解密的加密数据。可以是 ArrayBuffer 或 ArrayBufferView（例如 Uint8Array）。
   * @returns 一个 Promise，解析为包含解密后数据的 ArrayBuffer。
   */
  decrypt(
    algorithm:
      | AlgorithmIdentifier
      | RsaOaepParams
      | AesCtrParams
      | AesCbcParams
      | AesGcmParams,
    key: CryptoKey,
    data: BufferSource,
  ): Promise<ArrayBuffer>
}
```

### window.crypto.subtle.deriveBits

### window.crypto.subtle.deriveKey

### window.crypto.subtle.digest

### window.crypto.subtle.encrypt

```ts
interface SubtleCrypto {
  /**
   * 使用指定的算法和密钥加密数据。
   *
   * @param algorithm - 用于加密的算法。可以是字符串或指定算法详细信息的对象。
   * @param key - 用于加密的密钥。必须是 CryptoKey 对象。
   * @param data - 需要加密的数据。可以是 ArrayBuffer 或 ArrayBufferView（例如 Uint8Array）。
   * @returns 一个 Promise，解析为包含加密后数据的 ArrayBuffer。
   */
  encrypt(
    algorithm:
      | AlgorithmIdentifier
      | RsaOaepParams
      | AesCtrParams
      | AesCbcParams
      | AesGcmParams,
    key: CryptoKey,
    data: BufferSource,
  ): Promise<ArrayBuffer>
}
```

### window.crypto.subtle.exportKey

### window.crypto.subtle.generateKey

### window.crypto.subtle.importKey

```ts
interface SubtleCrypto {
  /**
   * SubtleCrypto 接口的 importKey() 方法用于导入密钥：它接受外部可移植格式的密钥作为输入，
   * 并返回一个可以在 Web Crypto API 中使用的 CryptoKey 对象。
   *
   * @param format - 描述要导入的键的数据格式的字符串。
   * @param keyData - 一个 ArrayBuffer、一个 TypedArray、一个 DataView，或一个包含以
   * 给定格式表示的密钥的 JSONWebKey 对象。
   * @param algorithm - 用于解密的算法。可以是字符串或指定算法详细信息的对象。
   * @param extractable - 一个布尔值，指示是否可以使用 SubtleCrypto.exportKey() 或
   * SubtleCrypto.wrapKey() 导出该密钥。
   * @param keyUsages - 一个数组，指示可以对密钥执行的操作。
   * @returns 一个 Promise，解析为包含导入的密钥的 CryptoKey 对象。
   */
  importKey(
    format: Exclude<KeyFormat, 'jwk'>,
    keyData: BufferSource,
    algorithm:
      | AlgorithmIdentifier
      | RsaHashedImportParams
      | EcKeyImportParams
      | HmacImportParams
      | AesKeyAlgorithm,
    extractable: boolean,
    keyUsages: KeyUsage[],
  ): Promise<CryptoKey>
}
```

### window.crypto.subtle.sign

### window.crypto.subtle.unwrapKey

### window.crypto.subtle.verify

### window.crypto.subtle.wrapKey

### window.crypto.getRandomValues

### randomUUID

## 完整示例

### 口令加密

> 每次加密都生成新的随机salt和iv，增大暴力破解的难度。
> 盐（Salt）

```js
async function deriveKeyFromPassword(password, salt) {
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey'],
  )

  const key = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  )

  return key
}

// 加密
async function encryptData(password, data) {
  // 生成盐
  const salt = window.crypto.getRandomValues(new Uint8Array(16))
  // 派生密钥
  const key = await deriveKeyFromPassword(password, salt)

  // 生成随机 IV
  const iv = window.crypto.getRandomValues(new Uint8Array(12))

  // 加密数据
  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
      tagLength: 128,
    },
    key,
    new TextEncoder().encode(data),
  )

  return {
    iv: iv,
    salt: salt,
    encryptedData: new Uint8Array(encryptedData),
  }
}

// 解密
async function decryptData(password, salt, iv, encryptedData) {
  // 派生密钥
  const key = await deriveKeyFromPassword(password, salt)

  // 解密数据
  const decryptedData = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv,
      tagLength: 128,
    },
    key,
    encryptedData,
  )

  return new TextDecoder().decode(decryptedData)
}

const password = '用户指定的口令'
const data = '这是需要加密的明文数据'
// 加密
const { iv, salt, encryptedData } = await encryptData(password, data)
console.log('加密后的数据:', encryptedData)
console.log('IV:', iv)
console.log('Salt:', salt)

// 解密
const decryptedData = await decryptData(password, salt, iv, encryptedData)
console.log('解密后的数据:', decryptedData)
```

<table>
    <thead>
        <tr><th>格式</th><th>算法</th><th>用途</th><th>备注</th></tr>
    </thead>
    <tbody>
        <tr><td rowspan="4">pkcs8<br>私钥</td><td>RSA-PSS</td><td>sign（签名）</td><td>用于非对称签名</td></tr>
        <tr><td>RSA-OAEP</td><td>decrypt（解密）</td><td>用于非对称解密（通常使用公钥加密）</td></tr>
        <tr><td>ECDSA</td><td>sign（签名）</td><td>椭圆曲线数字签名算法，用于数字签名</td></tr>
        <tr><td>EdDSA</td><td>sign（签名）</td><td>用于生成数字签名，通常用于高效的签名生成和验证</td></tr>
        <tr><td rowspan="3">spki<br>公钥</td><td>RSA-OAEP</td><td>encrypt（加密）</td><td>用于非对称加密</td></tr>
        <tr><td>RSA-PSS</td><td>verify（验证）</td><td>用于非对称签名验证</td></tr>
        <tr><td>ECDSA</td><td>verify（验证）</td><td>用于椭圆曲线数字签名验证</td></tr>
        <tr><td rowspan="2">raw<br>密钥</td><td>AES</td><td>encrypt/decrypt（加解密）</td><td>用于对称加密</td></tr>
        <tr><td>HMAC</td><td>sign（签名）</td><td>生成消息认证码（MAC）</td></tr>
        <tr><td rowspan="3">jwk<br>密钥</td><td>RSA</td><td>encrypt/decrypt（加解密）</td><td>用于非对称加密</td></tr>
        <tr><td>ECDSA</td><td>sign/verify（签名/验证）</td><td>用于椭圆曲线数字签名</td></tr>
        <tr><td>HMAC</td><td>sign/verify（签名/验证）</td><td>用于生成和验证消息认证码</td></tr>
    </tbody>
</table>

<details>
<summary>pkcs8Key 代码示例</summary>

```js
// 将字符串转换为ArrayBuffer
function str2ab(str) {
  const buf = new ArrayBuffer(str.length)
  const bufView = new Uint8Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

function importPrivateKey(pem) {
  //获取页眉和页脚之间的PEM字符串
  const pemHeader = '-----BEGIN PRIVATE KEY-----'
  const pemFooter = '-----END PRIVATE KEY-----'
  const pemContents = pem.substring(
    pemHeader.length,
    pem.length - pemFooter.length,
  )
  // base64解码字符串以获得二进制数据
  const binaryDerString = window.atob(pemContents)
  //将二进制字符串转换为ArrayBuffer
  const binaryDer = str2ab(binaryDerString)

  return window.crypto.subtle.importKey(
    'pkcs8',
    binaryDer,
    {
      name: 'RSA-PSS',
      //对于需要长期安全的系统，可以考虑使用4096位密钥
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['sign'],
  )
}

const pkcs8PrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDD0tPV/du2vftjvXj1t
/gXTK39sNBVrOAEb/jKzXae+Xa0H+3LhZaQIQNMfACiBSgIfZUvEGb+7TqXWQpoLoFR/R
7MvGWcSk98JyrVtveD8ZmZYyItSY7m2hcasqAFiKyOouV5vzyRe87/lEyzzBpF3bQQ4ID
aQu+K9Hj5fKuU6rrOeOhsdnJc+VdDQLScHxvMoLZ9Vtt+oK9J4/tOLwr4CG8khDlBURcB
Y6gPcLo3dPU09SW+6ctX2cX4mkXx6O/0mmdTmacr/vu50KdRMleFeZYOWPAEhhMfywybT
uzBiPVIZVP8WFCSKNMbfi1S9A9PdBqnebwwHhX3/hsEBt2BAgMBAAECggEABEI1P6nf6Z
s7mJlyBDv+Pfl5rjL2cOqLy6TovvZVblMkCPpJyFuNIPDK2tK2i897ZaXfhPDBIKmllM2
Hq6jZQKB110OAnTPDg0JxzMiIHPs32S1d/KilHjGff4Hjd4NXp1l1Dp8BUPOllorR2TYm
2x6dcCGFw9lhTr8O03Qp4hjn84VjGIWADYCk83mgS4nRsnHkdiqYnWx1AjKlY51yEK6Rc
rDMi0Th2RXrrINoC35sVv+APt2rkoMGi52RwTEseA1KZGFrxjq61ReJif6p2VXEcvHeX6
CWLx014LGk43z6Q28P6HgeEVEfIjyqCUea5Du/mYb/QsRSCosXLxBqwQKBgQD1+fdC9Zi
MrVI+km7Nx2CKBn8rJrDmUh5SbXn2MYJdrUd8bYNnZkCgKMgxVXsvJrbmVOrby2txOiqu
dZkk5mD3E5O/QZWPWQLgRu8ueYNpobAX9NRgNfZ7rZD+81vh5MfZiXfuZOuzv29iZhU0o
qyZ9y75eHkLdrerNkwYOe5aUQKBgQDLzapDi1NxkBgsj9iiO4KUa7jvD4JjRqFy4Zhj/j
bQvlvM0F/uFp7sxVcHGx4r11C+6iCbhX4u+Zuu0HGjT4d+hNXmgGyxR8fIUVxOlOtDkVJ
a5sOBZK73/9/MBeKusdmJPRhalZQfMUJRWIoEVDMhfg3tW/rBj5RYAtP2dTVUMQKBgDs8
yr52dRmT+BWXoFWwaWB0NhYHSFz/c8v4D4Ip5DJ5M5kUqquxJWksySGQa40sbqnD05fBQ
ovPLU48hfgr/zghn9hUjBcsoZOvoZR4sRw0UztBvA+7jzOz1hKAOyWIulR6Vca0yUrNlJ
6G5R56+sRNkiOETupi2dLCzcqb0PoxAoGAZyNHvTLvIZN4iGSrjz5qkM4LIwBIThFadxb
v1fq6pt0O/BGf2o+cEdq0diYlGK64cEVwBwSBnSg4vzlBqRIAUejLjwEDAJyA4EE8Y5A9
l04dzV7nJb5cRak6CrgXxay/mBJRFtaHxVlaZGxYPGSYE6UFS0+3EOmmevvDZQBf4qECg
YEA0ZF6Vavz28+8wLO6SP3w8NmpHk7K9tGEvUfQ30SgDx4G7qPIgfPrbB4OP/E0qCfsII
mi3sCPpjvUMQdVVZyPOIMuB+rV3ZOxkrzxEUOrpOpR48FZbL7RN90yRQsAsrp9e4iv8Qw
B3VxLe7X0TDqqnRyqrc/osGzuS2ZcHOKmCU8=
-----END PRIVATE KEY-----`
const cryptoKey = await importPrivateKey(pkcs8PrivateKey)

console.log('cryptoKey:', cryptoKey)
```

</details>

<details>
<summary>spkiKey 代码示例</summary>

```js
// 将字符串转换为ArrayBuffer
function str2ab(str) {
  const buf = new ArrayBuffer(str.length)
  const bufView = new Uint8Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

function importPublicKey(pem) {
  //获取页眉和页脚之间的PEM字符串
  const pemHeader = '-----BEGIN PUBLIC KEY-----'
  const pemFooter = '-----END PUBLIC KEY-----'
  const pemContents = pem.substring(
    pemHeader.length,
    pem.length - pemFooter.length,
  )
  // base64解码字符串以获得二进制数据
  const binaryDerString = window.atob(pemContents)
  // 将二进制字符串转换为ArrayBuffer
  const binaryDer = str2ab(binaryDerString)

  return window.crypto.subtle.importKey(
    'spki',
    binaryDer,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['encrypt'],
  )
}

const pemEncodedKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy3Xo3U13dc+xojwQYWoJLCbOQ5fOVY8LlnqcJm1W1
BFtxIhOAJWohiHuIRMctv7dzx47TLlmARSKvTRjd0dF92jx/xY20Lz+DXp8YL5yUWAFgA3XkO3LSJgEOex10N
B8jfkmgSb7QIudTVvbbUDfd5fwIBmCtaCwWx7NyeWWDb7A9cFxj7EjRdrDaK3ux/ToMLHFXVLqSL341TkCf4Z
Qoz96RFPUGPPLOfvN0x66CM1PQCkdhzjE6U5XGE964ZkkYUPPsy6Dcie4obhW4vDjgUmLzv0z7UD010RLIneU
gDE2FqBfY/C+uWigNPBPkkQ+Bv/UigS6dHqTCVeD5wgyBQIDAQAB
-----END PUBLIC KEY-----`
const cryptoKey = await importPublicKey(pemEncodedKey)

console.log('cryptoKey:', cryptoKey)
```

</details>

<details>
<summary>jwkKey 代码示例</summary>

```js
const jwkKey = {
  kty: 'oct', // 密钥类型
  k: 'GawgguFyGrWKavO8P4KORI0yA0D1w1M2S8Yg2h0d3z8', // 密钥材料（Base64Url 编码）
  alg: 'A256GCM', // 算法
  ext: true, // 是否可导出
}

const cryptoKey = await window.crypto.subtle.importKey(
  'jwk', // 密钥格式
  jwkKey, // 原始密钥字节
  { name: 'AES-GCM', length: 256 }, // 算法参数
  true, // 是否可导出
  ['encrypt', 'decrypt'], // 允许的用途
)

console.log('cryptoKey:', cryptoKey)
```

</details>

<details>
<summary>rawKey 代码示例</summary>

```js
const rawKey = new Uint8Array([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
])

const cryptoKey = await window.crypto.subtle.importKey(
  'raw', // 密钥格式
  rawKey, // 原始密钥字节
  { name: 'AES-GCM', length: 128 }, // 算法参数
  true, // 是否可导出
  ['encrypt', 'decrypt'], // 允许的用途
)

console.log('cryptoKey:', cryptoKey)
```

</details>
