const bookModule = require('../../module/book.schema')

const updateBook = async (req, res) => {

    // Data comes from body
    const data = req.body;
    // bookId comes from params
    const bookId = req.params.bookId;

    if (!bookId) return unsuccess(res, 400, "Post params required")
    if (Object.keys(data).length == 0) return unsuccess(res, 400, "Post body required")

    //👇 my query here
    const query = {
        userId: req.decodeToken.user,
        _id: bookId,
        isDelete: !true
    }

    try {
        // create user in users DB
        const bookObj = await bookModule.findOne(query);
        if (!bookObj) return unsuccess(res, 400, "No book found")

        // overide data
        if (data.name) {
            bookObj.name = data.name
        };

        if (data.remark) {
            bookObj.remark = data.remark
        };

        bookObj.save();

        success(res, 200, bookObj)
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


module.exports = updateBook