const express = require('express')
const Expense = require('../models/expense')
const router = new express.Router()

router.patch('/expenses/:id', async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'category', 'location', 'amount', 'date']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid expense update'})
    }

    try{
        const expense = await Expense.findById(req.params.id)

        updates.forEach((update) => expense[update] = req.body[update])
        await expense.save()

        if(!expense) {
            return res.status(400).send()
        }

        res.send(expense)

    }catch(e) {
        res.status(400).send(e)
    }
})

router.post('/expenses', (req, res) => {
    const expense = new Expense(req.body)
    expense.save().then(() => {
        res.status(201).send(expense)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

router.get('/expenses', (req, res) => {
    Expense.find({}).then((expenses) => {
        res.send(expenses)
    }).catch(() => {
        res.status(500).send()
    })
})

router.get('/expenses/:id', (req, res) => {
    const _id = req.params.id
    
    Expense.findById(_id).then((expense) => {
        if(!expense) {
            return res.status(404).send()
        }

        res.send(expense)
    }).catch((e) => {
        res.status(500).send()
    })
})

router.delete('/expenses/:id', async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id)

        if(!expense) {
            return res.status(400).send()
        }

        res.send(expense)

    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router