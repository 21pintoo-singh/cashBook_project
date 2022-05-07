const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            'Please add a valid phone number'
        ]
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email address.',
        ]
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: [String],
        required: true
    },
    paymentMethods: {
        type: [String],
        required: true
    },
    remark: String,
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})



module.exports = mongoose.model('user', userSchema); //users