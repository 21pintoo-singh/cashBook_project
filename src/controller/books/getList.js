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
        if (!data.name && !data.remark) return unsuccess(res, 400, "You can only search data by Name and Remarks")

        query['$or'] = [{
            name: data.name
        }, {
            remark: data.remark
        }]
    }

    try {
        //👇 create user in users DB
        const getBooksList = await bookModule.find(query).sort([['timeStamp', -1]]);
        if (getBooksList.length == 0) return unsuccess(res, 404, "Book list not found")

        success(res, 200, getBooksList)
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


module.exports = getBooks