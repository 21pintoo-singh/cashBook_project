const bookModule = require('../../module/book.schema')

const deleteBook = async (req, res) => {

    //👇 bookId comes from params
    const bookId = req.params.bookId;

    if (!bookId) return unsuccess(res, 400, "Post params required")

    //👇 my query here
    const query = {
        userId: req.decodeToken.user,
        _id: bookId,
        isDeleted: !true
    }


    try {
        //👇 create user in users DB
        const bookObj = await bookModule.findOne(query);
        if (!bookObj) return unsuccess(res, 404, "No book found")

        //👇 overide data
        bookObj.isDeleted = true;
        bookObj.save();

        success(res, 200, "Book delete successfull")
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