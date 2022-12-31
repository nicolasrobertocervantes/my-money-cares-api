const mongoose = require('mongoose')

const incomeShema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    category: {
        type: Number,
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

const Income = mongoose.model('Income', incomeShema)

module.exports = Income