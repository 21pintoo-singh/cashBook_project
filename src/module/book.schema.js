const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    remark: String,
    timeStamp: {
        type: Number,
        default: new Date().getTime()
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})



module.exports = mongoose.model('book', bookSchema); //books