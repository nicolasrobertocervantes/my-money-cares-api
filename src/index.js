const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Expense = require('./models/expense')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        res.status(201).send(user)
    } catch(e){
        res.status(400).send(e)
    }
})

app.get('/users', async (req, res) => {

    try{
        const users = await User.find({})
        res.send(users)
    } catch(e) {
        res.status(500).send(e)
    }
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    
    try{
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }
    
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
    
})

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update' })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.patch('/expenses/:id', async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'category', 'location', 'amount', 'date']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid expense update'})
    }

    try{
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if(!expense) {
            return res.status(400).send()
        }

        res.send(expense)

    }catch(e) {
        res.status(400).send(e)
    }
})

app.post('/expenses', (req, res) => {
    const expense = new Expense(req.body)
    expense.save().then(() => {
        res.status(201).send(expense)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/expenses', (req, res) => {
    Expense.find({}).then((expenses) => {
        res.send(expenses)
    }).catch(() => {
        res.status(500).send()
    })
})

app.get('/expenses/:id', (req, res) => {
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

app.listen(port, () => {
    console.log('Port is up on port ' + port)
})