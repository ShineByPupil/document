# Web Crypto API

Web Crypto API （发音 `/ˈkrɪptəʊ/`）提供了一套关于密码学原语的接口

## 前言

- 关于前端浏览器加密API的信息不全，甚至语言模型都是错误的，因此实践并整理文档和示例。
- js有能力加密敏感信息

## 环境

- 只有在https或localhost环境下运行。http环境下会报错，未加密的通信容易被截取和篡改
- 直接使用window对象调用crypto对象属性，Crypto不能实例化新的对象，甚至Crypto.prototype原型对象的方法也不能直接调用

## 属性 & 方法

[ces](#测试)

- `crypto`
    - `subtle`
        - [`decrypt()`](#decrypt) 解密数据
        - `deriveBits()`
        - `deriveKey()`
        - `digest()`
        - `encrypt()`
        - `exportKey()`
        - `generateKey()`
        - `importKey()`
        - `sign()`
        - `unwrapKey()`
        - `verify()`
        - `wrapKey()`
    - `getRandomValues()`
    - `randomUUID()`

### decrypt

```ts
type AlgorithmIdentifier = Algorithm | string

// RSA-OAEP
interface RsaOaepParams extends Algorithm {
    label?: BufferSource
}

// AES-CTR
interface AesCtrParams extends Algorithm {
    counter: BufferSource,
    length: number
}

// ES-CBC
interface AesCbcParams extends Algorithm {
    iv: BufferSource
}

// AES-GCM
interface AesGcmParams extends Algorithm {
    additionalData?: BufferSource,
    iv: BufferSource,
    tagLength?: number
}

interface CryptoKey {
    readonly algorithm: KeyAlgorithm,
    readonly extractable: boolean,
    readonly type: KeyType,
    readonly usages: KeyUsage[]
}

type BufferSource = ArrayBufferView | ArrayBuffer

interface SubtleCrypto {
    /**
     * 使用指定的算法和密钥解密数据。
     *
     * @param algorithm - 用于解密的算法。可以是字符串或指定算法详细信息的对象。
     * @param key - 用于解密的密钥。必须是 CryptoKey 对象。
     * @param data - 要解密的加密数据。可以是 ArrayBuffer 或 ArrayBufferView（例如，Uint8Array）。
     * @returns 一个 Promise，解析为包含解密后数据的 ArrayBuffer。
     */
    decrypt(
        algorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams,
        key: CryptoKey,
        data: BufferSource
    ): Promise<ArrayBuffer>;
}
```

*`algorithm` /ˈælɡərɪðəm/ n.（尤指计算机）算法，运算法则*

```js
window.crypto.subtle.decrypt(algorithm, key, data)
```

### window.crypto.subtle.deriveBits

### window.crypto.subtle.deriveKey

### window.crypto.subtle.digest

### window.crypto.subtle.encrypt

### window.crypto.subtle.exportKey

### window.crypto.subtle.generateKey

### window.crypto.subtle.importKey

### window.crypto.subtle.sign

### window.crypto.subtle.unwrapKey

### window.crypto.subtle.verify

### window.crypto.subtle.wrapKey

### window.crypto.getRandomValues

### randomUUID

## 示例

## 加密算法

### RSA-OAEP

### AES-CTR

### ES-CBC

### AES-GCM
