const mongoose = require('mongoose')

const Expense = mongoose.model('Expense', {
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: Number
    },
    location: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0,
        validate(value) {
            if(value <= 0) {
                throw new Error('Amount must be a positive value')
            }
        }
    },
    date: {
        type: Date,
        default: () => new Date(+new Date() + 7*24*60*60*1000)
    }
})

module.exports = Expense