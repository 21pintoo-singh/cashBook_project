const cashschema = require('../../module/cash.schema')
const userSchema = require('../../module/user.schema')
const bookSchema = require('../../module/book.schema')
const success = (res, status, msg) => {
    return res.status(status).send({ status: true, data: msg })
}
const unsuccess = (res, status, msg) => {
    return res.status(status).send({ status: false, message: msg })
}
const dbcheck = async (schema, query) => {
    try {
        return await schema.findOne(query)
    }
    catch (err) {
        return null
    }
}
const createpayment = async (req, res) => {
    try {
        let data = req.body
        let { amount, category, date, title, userId, bookId } = data
        if (Object.keys(data) < 0) return unsuccess(res, 400, "Post is required")
        if (!amount) return unsuccess(res, 400, "Amount is required")
        if (!category) return unsuccess(res, 400, "Category is required")
        if (!Array.isArray(category)) return unsuccess(res, 400, "Category required in array")
        if (!userId || !userId.trim()) return unsuccess(res, 400, "UserId is required")
        if (!title || !title.trim()) return unsuccess(res, 400, "Title is required")
        if (!bookId || !bookId.trim()) return unsuccess(res, 400, "BookId is required")
        if (!date || !date.trim()) return unsuccess(res, 400, "Date is required")
        if (!await dbcheck(userSchema, { _id: userId, isDeleted: false })) return unsuccess(res, 404, "UserId is invalid")
        if (!await dbcheck(bookSchema, { _id: bookId, isDeleted: false, userId: userId })) return unsuccess(res, 404, "BookId is invalid")
        data.date = new Date(date).getTime()
        let cash = await cashschema.create(data)
        return success(res, 201, cash)
    }
    catch (e) {
        return unsuccess(res, 500, e.message)
    }
}
module.exports = { createpayment }