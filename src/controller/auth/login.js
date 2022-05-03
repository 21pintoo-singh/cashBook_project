const userModule = require('../../module/user.schema')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {

    // Data comes from body
    const data = req.body;
    if (Object.keys(data).length == 0) return res.status(400).send({
        status: !true,
        message: "Post body required"
    })


    if (!data.emailId || data.emailId.trim() == '') return res.status(400).send({
        status: !true,
        message: "Email address must be required"
    })

    if (!data.password || data.password.trim() == '') return res.status(400).send({
        status: !true,
        message: "Password must be required"
    })


    try {
        // create user in users DB
        const findUser = await userModule.findOne({
            emailId: data.emailId,
            password: data.password
        });

        // if unavailable
        if (!findUser) return res.status(401).send({
            status: !true,
            message: "Wrong email address and password"
        })

        // if user deleted
        if (findUser.isDelete) return res.status(404).send({
            status: !true,
            message: "This account is unavailable OR may be deleted"
        })

        // generate Token
        const token = jwt.sign({
            user: findUser._id
        },"here-is-my-token-🤯")

        if (!token) return res.status(500).send({
            status: !true,
            message: "Can't generate token, please try again"
        })

        res.status(200).send({
            status: true,
            data: token
        })
    } catch (err) {
        res.status(500).send({
            status: !true,
            message: err.message
        })
    }
}


module.exports = login