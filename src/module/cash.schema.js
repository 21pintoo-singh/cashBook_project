const mongoose = require("mongoose")
const Objectid = mongoose.Schema.Types.ObjectId

const cashschema = new mongoose.Schema({
    amount: {
        type: Number,
        trim: true,
        required: "enter amount"
    },
    category: {
        type: [String],
        trim: true,
        required: "payment category"
    },
    date: {
        type: Number,
        trim: true,
        default: new Date().getTime()
    },
    title: {
        type: String,
        trim: true,
        required: "title is mandatory"
    },
    userId: {
        type: Objectid,
        trim: true,
        ref: 'user',
        required: "User ID is mandatory"
    },
    bookId: {
        type: Objectid,
        trim: true,
        ref: 'book',
        required: "Book ID is mandatory"
    },
    isDeleted: {
        type: Boolean,
        trim: true,
        default: false
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('payment', cashschema)