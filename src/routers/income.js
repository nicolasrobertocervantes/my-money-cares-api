const express = require('express')
const Income = require('../models/income')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/incomes', auth, async (req, res) => {
    const income = new Income({
        ...req.body,
        owner: req.user._id
    })

    try{
        await income.save()
        res.status(200).send(income)
    } catch(e) {
        res.status(401).send(e)
    }
})

router.get('/incomes', auth, async (req, res) => {
    try {
        await req.user.populate('incomes').execPopulate()
        res.send(req.user.income)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/incomes/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const income = await Income.findOne({ _id, owner: req.user._id })

        if (!income) {
            return res.status(404).send()
        }

        res.send(income)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/incomes/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'category', 'amount']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const income = await Income.findOne({ _id: req.params.id, owner: req.user._id})

        if (!income) {
            return res.status(404).send()
        }

        updates.forEach((update) => income[update] = req.body[update])
        await income.save()
        res.send(income)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/incomes/:id', auth, async (req, res) => {
    try {
        const income = await Income.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!income) {
            res.status(404).send()
        }

        res.send(income)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router