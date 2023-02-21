const usermodel = require('../../module/user.schema')

const viewProfile = async (req, res) => {
    try {
        const userId = req.decodeToken.user;
        const getUser = await usermodel.findOne({ _id: userId, isDeleted: false }).select({_id:0,
            password: 0, __v: 0, updatedAt: 0, createdAt: 0, isDeleted: 0, paymentMethods: 0, category: 0
        })
        if(!getUser) return res.status(404).send({status:false,message:"No such user found"})
        res.status(200).send({ status: true, data:getUser })
    }
    catch (e) {
        res.status(500).send({ status: false, message: e.message })
    }
}
module.exports={viewProfile}