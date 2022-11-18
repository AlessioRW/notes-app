const {User,Note} = require('../../db/models/index.model')
const express = require('express')
const loginRouter = express.Router()


loginRouter.get('/health', (req,res) => {
    res.sendStatus(200)
})


//login
loginRouter.get('/:username/:password', async (req,res) => {
    const params = req.params

    if (!params.username || !params.password){ //check if reqeust has needed data
        res.status(400).send('Requires username or password')
    }

    const existingUser = await User.findOne({
        where: {username: params.username}
    })

    if (existingUser){ //check if user exists
        if (existingUser.password === params.password){ //passwords match, maybe hash passwords in future
            res.status(200).send(existingUser)
        } else{
            res.sendStatus(400)
        }
    } else { //user does not exist
        res.sendStatus(404)
    }
})


//creating account
loginRouter.post('/new/:username/:password', async (req,res) => { 
    const params = req.params
    console.log(params)
    if (!params.username || !params.password){ //check if reqeust has needed data
        res.status(400).send('Requires username or password')
    }

    else{
        const existingUser = await User.findOne({
            where: {username: params.username}
        })
        if (existingUser){ //user already exists
            res.sendStatus(409)
        } else{
            try {
                const newUser = User.create({
                    username: params.username,
                    password: params.password
                })
                res.status(200).send(newUser)
            } catch {
                res.status(500)
            }
        }
    }
})

module.exports = loginRouter