const express = require('express')
const dbSetUp = require('./config/dbConfig')
const CONFIG = require('./config/Configs')
const bodyParser = require("body-parser")
const errorHandler = require('./middlewares/errorHandler')
const apiLimiter = require('./middlewares/rateLimit')
const userRouter = require('./routes/user.route')
const morgan = require("morgan")
const httpLoggerMW = require('./middlewares/httpLoggerMW')
const helmet = require("helmet")
const compression = require("compression")
const cors = require("cors");

const app = express()

dbSetUp()

// Add JWT authentication middleware
require("./middlewares/Authenticate")

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use(helmet());
app.use(compression());
app.use(morgan("combined"))
app.use(httpLoggerMW)

// app.use(passport.initialize())
app.use(apiLimiter);
// Add error handling middleware
app.use(errorHandler);



app.use('/api', userRouter)


app.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        msg: "Welcome to Eddy Food Mart"
    })
})



app.listen(CONFIG.Port, () => {
    console.log(`Server listening to port: ${CONFIG.Port}`)
})