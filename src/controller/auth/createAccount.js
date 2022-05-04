const userModule = require('../../module/user.schema')

const createAccount = async (req, res) => {

    //👇 Data comes from body
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

    if (!isValidMobile(data.phone)) return res.status(400).send({
        status: !true,
        message: "Invalid phone number, Try with a valid phone number"
    })

    if (!data.emailId || data.emailId.trim() == '') return res.status(400).send({
        status: !true,
        message: "Email address must be required"
    })

    if (!isValidEmail(data.emailId)) return res.status(400).send({
        status: !true,
        message: "Invalid email address, Try with a valid email address"
    })

    if (!data.password || data.password.trim() == '') return res.status(400).send({
        status: !true,
        message: "Password must be required"
    })

    // 👇 email address already exist
    let emailIsExist = userModule.findOne({
        emailId: data.emailId
    }).catch(_ => null)

    if (emailIsExist) return res.status(406).send({
        status: !true,
        message: "Email address already exist"
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
        //👇 create user in users DB
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





//👇 validate email address 📧
const isValidEmail = (email) => {
    let regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regEx.test(email)
}

//👇 validate phone number ☎️
const isValidMobile = (number) => {
    let regEx = /^[6-9]\d{9}$/
    return regEx.test(number)
}



module.exports = createAccount