const express = require('express');
const authC = require('../middleWare/authentication')
const authZ = require('../middleWare/authorization')
const createAccount = require('../controller/auth/createAccount')
const getUser = require('../controller/auth/viewUserProfile')
const delCategory = require('../controller/auth/deleteUsersCategory')
const delpaymentMethods = require('../controller/auth/delUsersPaymentMethods')
const login = require('../controller/auth/login')
const createBook = require('../controller/books/create')
const getBookList = require('../controller/books/getList')
const updateBook = require('../controller/books/update')
const deleteBook = require('../controller/books/delete')
const payment = require('../controller/payment/create')
const delpay = require('../controller/payment/deletepayment')
const viewpayment = require('../controller/payment/viewEachPayment')
const listpay = require('../controller/payment/getPaymentfromBook')
const allTags = require('../controller/auth/getTageOrPayTypes')
const addCategory = require('../controller/auth/addCategory')
const addPaymentMethods = require('../controller/auth/addPaymentMethods')
const deleteUser = require('../controller/auth/deleteUser')
const updateUser = require('../controller/auth/upDateUserDetails')
const payupdate = require('../controller/payment/updatePayment')
const router = express.Router();

//user
router.post('/register', createAccount)
router.post('/login', login)

router.get('/user/viewProfile', authC, getUser.viewProfile,)
router.get('/user/categoryList', authC, allTags.categoryList)
router.get('/user/paymentTypeList', authC, allTags.paymentTypeList)
router.get('/user/allTagsList', authC, allTags.getPaymentsAndCetagoryList)
router.put('/user/update', authC, updateUser.userUpdate)
router.put('/user/changePassword', authC, updateUser.changePassword)
router.delete('/user/delete', authC, deleteUser)
router.put('/user/addCategory', authC, addCategory)
router.put('/user/addPaymentMethods', authC, addPaymentMethods)
router.delete('/user/deleteCategory', authC, delCategory.deleteCategory)
router.delete('/user/deletePaymentmethods', authC, delpaymentMethods.deletePayment)

//book
router.post('/createBook', authC, createBook)
router.get('/listBook', authC, getBookList)
router.post('/updateBook/:bookId', authC, authZ.byBook, updateBook)
router.delete('/deleteBook/:bookId', authC, authZ.byBook, deleteBook)

//payment
router.post('/CreatePayment', authC, payment.createpayment)
router.get('/viewpayment/:paymentId', authC, authZ.byPayment, viewpayment.viewPayments)
router.delete('/deletePayment/:paymentId', authC, authZ.byPayment, delpay.del)
router.get('/listofPayment/:bookId', authC, authZ.byBook, listpay)
router.put('/updatepayment/:paymentId', authC, authZ.byPayment, payupdate.updatePay)











module.exports = router