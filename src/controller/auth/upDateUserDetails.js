const usermodel = require('../../module/user.schema')

const userUpdate = async (req, res) => {
    try {
        let data = req.body
        const userId = req.decodeToken.user;
        console.log(userId)
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "Enter information for updation" })
        let { name, phone, emailId } = data
        let docfound = await usermodel.findOne({ _id: userId }).catch(err => null)
        if (!docfound) return res.status(404).send({ status: false, message: "No user data found" })
        if (name) docfound.name = name;
        //check phone number and emailId
        if (phone && phone.trim()) {
            let phoneCheck = await usermodel.findOne({ _id: { $ne: userId }, phone: phone }).catch(err => null)
            if (phoneCheck) {
                return res.status(400).send({ status: false, message: "Phone no already exits" })
            } else {
                docfound.phone = phone;
            }
        }
        if (emailId && emailId.trim()) {
            let EmailCheck = await usermodel.findOne({ _id: { $ne: userId }, emailId: emailId }).catch(err => null)
            if (EmailCheck) {
                return res.status(400).send({ status: false, message: "Email already exits" })
            } else {
                docfound.emailId = emailId;
            }
        }
        docfound.save();
        res.status(200).send({ status: true, data: docfound })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}
module.exports = userUpdate