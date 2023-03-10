const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    category: {
        type: Number,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense