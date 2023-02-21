const bookModule = require('../../module/book.schema')
const cashschema = require('../../module/cash.schema')


const deleteBook = async (req, res) => {

    //👇 bookId comes from params
    const bookId = req.params.bookId;

    if (!bookId) return unsuccess(res, 400, "Post params required")

    //👇 my query here
    const query = {
        userId: req.decodeToken.user,
        _id: bookId,
        //isDeleted: !true
    }


    try {
        //👇 create user in users DB
        const bookObj = await bookModule.findOne(query);
        if (!bookObj) return unsuccess(res, 404, "No book found")
        //delete books
        await bookModule.deleteOne({ userId: req.decodeToken.user, _id: bookId })
        //deleting payments related to that book
        await cashschema.deleteMany({ userId: req.decodeToken.user, bookId: bookId })
        success(res, 200, "Book delete successfully.")
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


module.exports = deleteBook