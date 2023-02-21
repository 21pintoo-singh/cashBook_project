const cashschema = require('../../module/cash.schema')


const updatePay = async (req, res) => {
    try {
        let data = req.body
        let payDetails = req.validate
        let { title, paymentType, amount, category } = data
        //console.log(payDetails)
        if (title) {
            payDetails.title = title;
        }
        if (paymentType) {
            payDetails.paymentType = paymentType;
        }
        if (amount) {
            payDetails.amount = amount
        }
        if (category) {
            payDetails.category = category
        }
        await payDetails.save();
        return res.status(200).send({ status: true, data: payDetails })
    }
    catch (e) {
        return res.status(500).send({ status: false, message: e.message })
    }
}

module.exports = { updatePay }