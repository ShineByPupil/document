# IndexedDB - 持久化存储

> 浏览器端的事务型 NoSQL 数据库，支持结构化数据存储、索引查询和异步操作。适合存储大量结构化数据，提供比 Web Storage
> 更强大的查询能力。

## 核心特性

- **容量限制**：动态分配（通常数百 MB 到数 GB）
- **事务支持**：ACID 事务、索引查询、游标遍历
- **数据类型**：支持结构化数据（对象、文件等）
- **异步操作**：基于事件回调

## 应用场景

- 离线应用存储大量结构化数据（如用户生成内容）
- 复杂查询需求的本地缓存（如日志、历史记录）

## 基本用法

```js
// 打开数据库
const request = indexedDB.open('myDatabase', 2)

// 数据库升级事件处理（当数据库首次创建或版本号更新时触发）
request.onupgradeneeded = (e) => {
  // 数据库实例
  const db = e.target.result

  // 检查是否存在名为'books'的对象存储空间（类似SQL的表）
  if (!db.objectStoreNames.contains('books')) {
    // 创建新的对象存储空间，设置主键为isbn字段
    const store = db.createObjectStore('books', { keyPath: 'isbn' })

    // 在author字段上创建名为'by_author'的非唯一索引
    // 允许通过作者名称快速查询相关书籍
    store.createIndex('by_author', 'author', { unique: false })
  }
}

// 数据库成功打开事件处理
request.onsuccess = (e) => {
  // 数据库连接实例
  const db = e.target.result

  // 开启一个读写事务，指定作用的对象存储为'books'
  const tx = db.transaction('books', 'readwrite')

  // 获取对象存储空间的引用
  const store = tx.objectStore('books')

  // 向存储空间添加一条图书数据
  // add方法会自动使用isbn字段作为主键
  store.add({
    isbn: '978-3-16-148410-0',
    title: 'Web开发进阶',
    author: 'John Doe',
    price: 49.99,
  })

  // 获取预先创建的'by_author'索引
  const index = store.index('by_author')

  // 使用索引查询所有author字段为'John Doe'的记录
  const query = index.getAll('John Doe')

  // 查询成功回调
  query.onsuccess = () => console.log(query.result)
}
```
