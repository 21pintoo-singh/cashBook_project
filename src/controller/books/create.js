const bookModule = require('../../module/book.schema')

const createBook = async (req, res) => {

    // Data comes from body
    const data = req.body;
    if (Object.keys(data).length == 0) return res.status(400).send({
        status: !true,
        message: "Post body required"
    })


    if (!data.name || data.name.trim() == '') return res.status(400).send({
        status: !true,
        message: "Name must be required"
    })

    //👇 extra extra extra extra
    data.userId = req.decodeToken.user;


    try {
        // create user in users DB
        const createBook = await bookModule.create(data);
        res.status(200).send({
            status: true,
            data: createBook
        })
    } catch (err) {
        res.status(500).send({
            status: !true,
            message: err.message
        })
    }
}


module.exports = createBook