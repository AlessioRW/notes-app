const express = require('express')
const {loginRouter, mainRouter} = require('./routes/index.route.js')
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())
app.use('/login', loginRouter)
app.use('/main', mainRouter)

app.listen(5001, () => {
    console.log('Server up on port 5001')
})