const usermodel = require('../../module/user.schema')
const bookmodel = require('../../module/book.schema')
const cashmodel = require('../../module/cash.schema')


const delUser = async (req, res) => {
    try {
        let userPswrd = req.body.password;
        const userId = req.decodeToken.user;
        if (!userPswrd) return res.status(400).send({ status: false, message: "Enter password" })
        const pswrdverify = await usermodel.findOne({ userId: userId, password: userPswrd }).catch(err => null)
        if (!pswrdverify) return res.status(400).send({ status: false, message: "Password is incorect" })
        if (pswrdverify.isDeleted === true) return res.status(404).send({ status: false, message: "User not exists or user is deleted" })
        await usermodel.updateOne({ _id: userId, password: userPswrd }, { $set: { isDeleted: true } })

        //updateing book model isdeleted to true [book related to user]
        await bookmodel.updateMany({ userId: userId }, { isDeleted: true })
        await cashmodel.updateMany({ userId: userId }, { isDeleted: true })
        res.status(200).send({ status: true, Data: `User deleted successfully` })
    }
    catch (e) {
        res.status(500).send({ status: false, message: e.message })
    }
}
module.exports = delUser