const bookModule = require('../../module/book.schema')

const getBooks = async (req, res) => {

    //👇 my query
    let query = {
        userId: req.decodeToken.user,
        isDelete: !true
    };

    //👇 for query part
    let data = req.query;
    if (Object.keys(data).length > 0) {
        if (!data.name && !data.remark) return res.status(400).send({
            status: true,
            message: "You can only search data by Name and Remarks"
        })

        query['$or'] = [{
            name: data.name
        }, {
            remark: data.remark
        }]
    }

    try {
        //👇 create user in users DB
        const getBooksList = await bookModule.find(query);
        res.status(200).send({
            status: true,
            data: getBooksList
        })
    } catch (err) {
        res.status(500).send({
            status: !true,
            message: err.message
        })
    }
}


module.exports = getBooks