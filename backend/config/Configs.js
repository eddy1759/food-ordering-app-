require('dotenv').config()


const config = {
    Port: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    jwtConfig: {
        SECRET: process.env.JWT_SECRET,
        EXPIRESIN: process.env.EXPIRESIN
    }
}

module.exports = config