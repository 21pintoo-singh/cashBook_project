const bookModule = require('../../module/book.schema')

const updateBook = async (req, res) => {

    // Data comes from body
    const data = req.body;
    // bookId comes from params
    const bookId = req.params.bookId;

    if (!bookId) return res.status(400).send({
        status: !true,
        message: "Post params required"
    })

    if (Object.keys(data).length == 0) return res.status(400).send({
        status: !true,
        message: "Post body required"
    })


    //👇 my query here
    const query = {
        userId: req.decodeToken.user,
        _id: bookId,
        isDelete: !true
    }


    try {
        // create user in users DB
        const bookObj = await bookModule.findOne(query);
        if (!bookObj) return res.status(404).send({
            status: !true,
            message: "No book found"
        })

        // overide data
        if (data.name) {
            bookObj.name = data.name
        };

        if (data.remark) {
            bookObj.remark = data.remark
        };

        bookObj.save();

        res.status(200).send({
            status: true,
            data: bookObj
        })
    } catch (err) {
        res.status(500).send({
            status: !true,
            message: err.message
        })
    }
}


module.exports = updateBook