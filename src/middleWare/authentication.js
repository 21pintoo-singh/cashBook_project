const jwt = require("jsonwebtoken");

const authC = async (req, res, next) => {
    try {
        const token = req.headers["x-auth-key"]

        if (!token) return res.status(400).send({
            status: !true,
            message: "Token must be required"
        })

        // varify token 
        const decodeToken = jwt.verify(token, "here-is-my-token-🤯")
        // console.log(decodeToken)
        if (!decodeToken) return res.status(401).send({
            status: !true,
            message: "Invalid token"
        })
        // save decodeData in req
        req.decodeToken = decodeToken
        next();
    } catch (err) {
        res.status(500).send({
            status: !true,
            message: err.message
        })
    }
}

module.exports = authC