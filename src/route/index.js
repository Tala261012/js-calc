// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// Підключіть файли роутів
const test = require('./test')
// Підключіть інші файли роутів, якщо є
const calc = require('./calc')
const calcold = require('./calcold')
// Об'єднайте файли роутів за потреби
router.use('/', calc)
// router.use('/calc', calc)
router.use('/calcold', calcold)
// Використовуйте інші файли роутів, якщо є

// Експортуємо глобальний роутер
module.exports = router
