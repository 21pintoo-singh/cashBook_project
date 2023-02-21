const usermodel = require('../../module/user.schema')

const addPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = req.body.paymentMethods;
        if (!paymentMethods) return res.status(400).send({
            status: false,
            message: "paymentMethods must be required!"
        })

        const userId = req.decodeToken.user;
        const getUser = await usermodel.findOne({
            _id: userId,
            isDeleted: false
        })
        if (!getUser) return res.status(404).send({
            status: false,
            message: "No such user found"
        })
        if (getUser.paymentMethods.indexOf(paymentMethods) !== -1) return res.status(400).send({
            status: false,
            message: "paymentMethods already exist!"
        })
        //let arr=[]
        getUser.paymentMethods.push(paymentMethods)
        await getUser.save();
        res.status(200).send({
            status: true,
            data: getUser.paymentMethods
        })
    } catch (_) {
        res.status(500).send({
            status: false,
            message: _.message
        })
    }
}

module.exports = addPaymentMethods