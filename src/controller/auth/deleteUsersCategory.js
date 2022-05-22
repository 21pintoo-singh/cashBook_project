const usermodel = require('../../module/user.schema')

const deleteCategory = async (req, res) => {
    try {
        const delCategory = req.body.category
        if (!delCategory) return res.status(400).send({ status: false, message: "enter category for deletion" })
        const userId = req.decodeToken.user;
        const getUser = await usermodel.findOne({ _id: userId, isDeleted: false })
        if (!getUser) return res.status(404).send({ status: false, message: "No such user found" })
        const checkcategory = getUser.category.indexOf(delCategory)
        if (checkcategory == -1) return res.status(404).send({ status: false, message: "Category not found" })
        getUser.category.splice(checkcategory, 1)
        await getUser.save();
        res.status(200).send({ status: true, data: getUser.category })
    }
    catch (e) {
        res.status(500).send({ status: false, message: e.message })
    }
}
module.exports = { deleteCategory }