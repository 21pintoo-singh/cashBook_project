const userModule = require('../../module/user.schema')

const categoryList = async (req, res) => {
    try {
        const userId = req.decodeToken.user;

        const userData = await userModule.findOne({
            _id: userId,
            isDeleted: false
        }).catch(_ => null)

        //👇 check 'categoryListing' is exist OR 'category' exist OR the 'length'
        if (!userData || !userData.category || userData.category.length == 0) return res.status(404).send({
            status: false,
            data: 'No category(s) list found'
        })

        res.status(200).send({
            status: true,
            data: userData.category
        })

    } catch (e) {
        res.status(500).send({
            status: false,
            data: e.message
        })
    }
}


const paymentTypeList = async (req, res) => {
    try {
        const userId = req.decodeToken.user;

        const userData = await userModule.findOne({
            _id: userId,
            isDeleted: false
        }).catch(_ => null)

        //👇 check 'paymentMethodsListing' is exist OR 'paymentMethods' exist OR the 'length'
        if (!userData || !userData.paymentMethods || userData.paymentMethods.length == 0) return res.status(404).send({
            status: false,
            data: 'No paymentMethods(s) list found'
        })

        res.status(200).send({
            status: true,
            data: userData.paymentMethods
        })

    } catch (e) {
        res.status(500).send({
            status: false,
            data: e.message
        })
    }
}


const getPaymentsAndCetagoryList = async (req, res) => {
    try {
        const userId = req.decodeToken.user;

        const userData = await userModule.findOne({
            _id: userId,
            isDeleted: false
        }).catch(_ => null)

        //👇 check 'paymentMethodsListing' is exist OR 'paymentMethods' exist OR the 'length'
        if (!userData || !userData.paymentMethods || userData.paymentMethods.length == 0) return res.status(404).send({
            status: false,
            data: 'No paymentMethods(s) list found'
        })

        res.status(200).send({
            status: true,
            data: {
                payment: userData.paymentMethods,
                category: userData.category
            }
        })

    } catch (e) {
        res.status(500).send({
            status: false,
            data: e.message
        })
    }
}


module.exports = {
    categoryList,
    paymentTypeList,
    getPaymentsAndCetagoryList
}