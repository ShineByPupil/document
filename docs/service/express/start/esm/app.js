var createError = require('http-errors') // [!code --]
var express = require('express') // [!code --]
var path = require('path') // [!code --]
var cookieParser = require('cookie-parser') // [!code --]
var logger = require('morgan') // [!code --]
import createError from 'http-errors' // [!code ++]
import express from 'express' // [!code ++]
import path from 'path' // [!code ++]
import cookieParser from 'cookie-parser' // [!code ++]
import logger from 'morgan' // [!code ++]
import url from 'url' // [!code ++]

var indexRouter = require('./routes/index') // [!code --]
var usersRouter = require('./routes/users') // [!code --]
import indexRouter from './routes/index.js' // [!code ++]
import usersRouter from './routes/users.js' // [!code ++]

const __filename = url.fileURLToPath(import.meta.url) // [!code ++]
const __dirname = path.dirname(__filename) // [!code ++]

// ...

module.exports = app // [!code --]
export default app // [!code ++]
