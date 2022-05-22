const usermodel = require('../../module/user.schema')

const deletePayment = async (req, res) => {
    try {
        const delpaymentMethods = req.body.paymentMethods
        if (!delpaymentMethods) return res.status(400).send({ status: false, message: "enter paymentMethods for deletion" })
        const userId = req.decodeToken.user;
        const getUser = await usermodel.findOne({ _id: userId, isDeleted: false })
        if (!getUser) return res.status(404).send({ status: false, message: "No such user found" })
        const checkpaymentmethod = getUser.paymentMethods.indexOf(delpaymentMethods)
        if (checkpaymentmethod == -1) return res.status(404).send({ status: false, message: "paymentMethods not found" })
        getUser.paymentMethods.splice(checkpaymentmethod, 1)
        await getUser.save();
        res.status(200).send({ status: true, data: getUser.paymentMethods })
    }
    catch (e) {
        res.status(500).send({ status: false, message: e.message })
    }
}
module.exports = { deletePayment }