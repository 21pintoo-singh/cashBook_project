const userModule = require('../../module/user.schema')

const createAccount = async (req, res) => {

    //👇 Data comes from body
    const data = req.body;
    if (Object.keys(data).length == 0) return unsuccess(res, 400, "Post body required")
    if (!data.name || data.name.trim() == '') return unsuccess(res, 400, "Name must be required")
    if (!data.phone || data.phone.trim() == '') return unsuccess(res, 400, "Phone number must be required")
    if (!isValidMobile(data.phone)) return unsuccess(res, 400, "Invalid phone number, Try with a valid phone number")
    if (!data.emailId || data.emailId.trim() == '') return unsuccess(res, 400, "Email address must be required")
    if (!isValidEmail(data.emailId)) return unsuccess(res, 400, "Invalid email address, Try with a valid email address")
    if (!data.password || data.password.trim() == '') return unsuccess(res, 400, "Password must be required")

    // 👇 email address already exist
    if (await dbcheck(userModule, {
            emailId: data.emailId
        })) return unsuccess(res, 406, "Email address already exist");

    // 👇 email address already exist
    if (await dbcheck(userModule, {
            phone: data.phone
        })) return unsuccess(res, 406, "Phone Number already exist");




    // 👇 add default values
    data.category = ["Salary", "Sale", "Maintenance","Food","Travel"]
    data.paymentMethods = ["Cash", "Cheque", "NetBanking", "UPI Payment"];

    try {
        //👇 create user in users DB
        const createUser = await userModule.create(data);
        success(res, 201, createUser)
    } catch (err) {
        success(res, 500, err.message)
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

//👇 validate db data
const dbcheck = async (schema, query) => {
    try {
        return await schema.findOne(query)
    } catch (err) {
        return null
    }
}

//👇 send success message
const success = (res, status, msg) => {
    return res.status(status).send({
        status: true,
        data: msg
    })
}

//👇 send unsuccess message
const unsuccess = (res, status, msg) => {
    return res.status(status).send({
        status: !true,
        message: msg
    })
}

module.exports = createAccount