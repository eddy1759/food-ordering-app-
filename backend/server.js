const express = require('express')
const dbSetUp = require('./config/dbConfig')
const CONFIG = require('./config/Configs')
const bodyParser = require("body-parser")
const errorHandler = require('./middlewares/errorHandler')
const apiLimiter = require('./middlewares/rateLimit')
const userRouter = require('./routes/user.route')


dbSetUp()
require("./middlewares/Authenticate")


const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(passport.initialize())
app.use(apiLimiter);

app.use('/api/user', userRouter)


app.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        msg: "Welcome to Eddy Food Mart"
    })
})

app.use(errorHandler);

app.listen(CONFIG.Port, () => {
    console.log(`Server listening to port: ${CONFIG.Port}`)
})