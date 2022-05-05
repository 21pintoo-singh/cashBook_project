const bookschema = require('../../module/book.schema')
const Payschema = require('../../module/cash.schema')
const lodash = require('lodash');

const getPaymenetList = async (req, res) => {
    try {
        let bookid = req.params.bookId
        let userId = req.decodeToken.user
        let bookidverify = await bookschema.findOne({
            _id: bookid,
            isDeleted: false,
            userId: userId
        }).select({
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        }).catch(err => null)
        if (!bookidverify) return res.status(404).send({
            status: false,
            message: "No Book found"
        })
        let paymentList = await Payschema.find({
            bookId: bookid,
            userId: userId
        }).select({
            userId: 0,
            bookid: 0,
            isDeleted: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        })

        const inData = paymentList.filter(x => x.type == "IN" ? true : false).map(x => x.amount)
        const outData = paymentList.filter(x => x.type == "OUT" ? true : false).map(x => x.amount)
        let inAmount = lodash.sum(inData);
        let outAmount = lodash.sum(outData);
        let total = Math.floor((inAmount - outAmount) * 100) / 100

        let op = {
            timeStamp: bookidverify.timeStamp,
            _id: bookidverify._id,
            name: bookidverify.name,
            userId: bookidverify.userId,
            remark: bookidverify.remark,
            isDelete: bookidverify.isDeleted,
            inAmount,
            outAmount,
            total,
            paymentList
        }



        res.status(200).send({
            op
        })
    } catch (er) {
        res.status(500).send(er.message)
    }
}
module.exports = getPaymenetList