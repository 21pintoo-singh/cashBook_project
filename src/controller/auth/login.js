const userModule = require('../../module/user.schema')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {

    // Data comes from body
    const data = req.body;
    if (Object.keys(data).length == 0) return unsuccess(res, 400, "Post body required")
    if (!data.emailId || data.emailId.trim() == '') return unsuccess(res, 400, "Email address must be required")
    if (!data.password || data.password.trim() == '') return unsuccess(res, 400, "Password must be required")


    try {
        // create user in users DB
        const findUser = await userModule.findOne({
            emailId: data.emailId,
            password: data.password
        });

        // if unavailable
        if (!findUser) return unsuccess(res, 401, "Wrong email address or password")

        // if user deleted
        if (findUser.isDeleted) return unsuccess(res, 404, "This account is unavailable OR may be deleted")

        // generate Token
        const token = jwt.sign({
            user: findUser._id
        }, "here-is-my-token-🤯")

        if (!token) return unsuccess(res, 500, "Can't generate token, please try again")

        success(res, 200, token)

    } catch (err) {
        unsuccess(res, 500, err.message)
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


module.exports = login