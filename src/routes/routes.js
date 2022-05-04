const express = require('express');
const authC = require('../middleWare/authentication')
const authZ = require('../middleWare/authorization')
const createAccount = require('../controller/auth/createAccount')
const login = require('../controller/auth/login')
const createBook = require('../controller/books/create')
const getBookList = require('../controller/books/getList')
const updateBook = require('../controller/books/update')
const deleteBook = require('../controller/books/delete')
const payment=require('../controller/payment/create')


const router = express.Router();


router.post('/register', createAccount)
router.post('/login', login)

router.post('/createBook', authC, createBook)
router.get('/listBook', authC, getBookList)
router.post('/updateBook/:bookId', authC, authZ.byBook, updateBook)
router.delete('/deleteBook/:bookId', authC, authZ.byBook, deleteBook)
router.post('/CreatePayment',payment.createpayment)











module.exports = router