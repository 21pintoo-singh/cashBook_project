const cashschema = require('../../module/cash.schema')

const viewPayments = async (req, res) => {
    try {
        const paymentId = req.params.paymentId
        const userId = req.decodeToken.user
        const checkDB = await cashschema.findOne({ userId: userId, _id: paymentId, isDeleted: false }).select({
            __v: 0, updatedAt: 0, createdAt: 0, isDeleted: 0, userId: 0
        })
        if (!checkDB) return res.status(404).send({ status: false, message: "No such Payment found" })
        res.status(200).send({ status: true, data: checkDB })
    }
    catch (e) {
        return res.status(500).send({ status: false, message: e.message })
    }
}
module.exports = { viewPayments }