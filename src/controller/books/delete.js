const bookModule = require('../../module/book.schema')

const deleteBook = async (req, res) => {

    //👇 bookId comes from params
    const bookId = req.params.bookId;

    if (!bookId) return res.status(400).send({
        status: !true,
        message: "Post params required"
    })

    //👇 my query here
    const query = {
        userId: req.decodeToken.user,
        _id: bookId,
        isDelete: !true
    }


    try {
        //👇 create user in users DB
        const bookObj = await bookModule.findOne(query);
        if (!bookObj) return res.status(404).send({
            status: !true,
            message: "No book found"
        })

        //👇 overide data
        bookObj.isDelete = true;
        bookObj.save();

        res.status(200).send({
            status: true,
            data: "Book deleted successfully"
        })
    } catch (err) {
        res.status(500).send({
            status: !true,
            message: err.message
        })
    }
}


module.exports = deleteBook