const express = require('express')
const app = express()

// 允许的具体域名列表（根据需求配置）
const allowedOrigins = ['https://your-domain.com']

// 通用CORS中间件（处理所有请求）
app.use((req, res, next) => {
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Max-Age', '86400')
  next()
})

// 专门处理OPTIONS预检请求（按需可选）
app.options('*', (req, res) => {
  // 处理所有路径的OPTIONS
  res.sendStatus(200) // 中间件已经设置过CORS头
})

// 业务路由
app.post('/data', (req, res) => {
  res.json({ message: 'Data received' })
})

app.listen(3000, () => console.log('Server running on port 3000'))
