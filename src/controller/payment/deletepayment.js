const cashschema = require('../../module/cash.schema')

const del = async (req, res) => {
    try {
        let del = req.params.paymentId
        let userid = req.decodeToken.user
        let check = await cashschema.findById(del)
        if (!check) return res.status(403).send({ status: false, message: "Paymentid Invalid" })
        if (check.isDeleted === true) return res.status(403).send({ status: false, message: "Payment is already deleted" })
        await cashschema.updateOne({ _id: del, userId: userid }, { $set: { isDeleted: true } })
        return res.status(200).send({ status: true, data: "Payment deleted successfully" })
    }
    catch (er) {
        res.status(500).send({ status: false, message: er.message })
    }
}
module.exports.del = del