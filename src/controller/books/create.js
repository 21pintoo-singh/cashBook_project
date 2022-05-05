const bookModule = require('../../module/book.schema')

const createBook = async (req, res) => {

    // Data comes from body
    const data = req.body;
    if (Object.keys(data).length == 0) return unsuccess(res, 400, "Post body required")
    if (!data.name || data.name.trim() == '') return unsuccess(res, 400, "Name must be required")

    //👇 extra extra extra extra
    data.userId = req.decodeToken.user;

    try {
        // create user in users DB
        data.timeStamp = new Date().getTime()
        const createBook = await bookModule.create(data);
        success(res, 201, createBook)
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


module.exports = createBook