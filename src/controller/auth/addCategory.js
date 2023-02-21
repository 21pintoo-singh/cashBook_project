const usermodel = require('../../module/user.schema')

const addCategory = async (req, res) => {
    try {
        const category = req.body.category;
        if (!category) return res.status(400).send({
            status: false,
            message: "Category must be required!"
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
        if (getUser.category.indexOf(category) !== -1) return res.status(400).send({
            status: false,
            message: "Category already exist!"
        })
        //let arr=[]
        getUser.category.push(category)
        await getUser.save();
        res.status(200).send({
            status: true,
            data: getUser.category
        })
    } catch (_) {
        res.status(500).send({
            status: false,
            message: _.message
        })
    }
}

module.exports = addCategory