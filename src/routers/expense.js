const express = require('express')
const Expense = require('../models/expense')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/expenses', auth, async (req, res) => {
    const expense = new Expense({
        ...req.body,
        owner: req.user._id
    })

    try{
        await expense.save()
        res.status(200).send(expense)
    } catch(e) {
        res.status(401).send(e)
    }
})

module.exports = router