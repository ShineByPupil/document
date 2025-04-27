var express = require('express') // [!code --]
var router = express.Router() // [!code --]
import express from 'express' // [!code ++]
const router = express.Router() // [!code ++]

// ...

module.exports = router // [!code --]
export default router // [!code ++]
