const userModule = require('../../module/user.schema')

const createAccount = async (req, res) => {

    // Data comes from body
    const data = req.body;
    if (Object.keys(data).length == 0) return res.status(400).send({
        status: !true,
        message: "Post body required"
    })


    if (!data.name || data.name.trim() == '') return res.status(400).send({
        status: !true,
        message: "Name must be required"
    })

    if (!data.phone || data.phone.trim() == '') return res.status(400).send({
        status: !true,
        message: "Phone number must be required"
    })

    if (!data.emailId || data.emailId.trim() == '') return res.status(400).send({
        status: !true,
        message: "Email address must be required"
    })

    if (!data.password || data.password.trim() == '') return res.status(400).send({
        status: !true,
        message: "Password must be required"
    })


    // 👇 extra  extra  extra  extra  extra
    data.category = [{
        tagName: "Salary"
    }, {
        tagName: "Sale"
    }, {
        tagName: "Billsary"
    }, {
        tagName: "Maintenance"
    }]

    data.paymentMethods = ["Cash", "Cheque", "NetBanking", "UPI Payment", "Google Pay", "PhonePe", "Paytm"];



    try {
        // create user in users DB
        const createUser = await userModule.create(data);
        res.status(200).send({
            status: true,
            data: createUser
        })
    } catch (err) {
        res.status(500).send({
            status: !true,
            message: err.message
        })
    }
}


module.exports = createAccount