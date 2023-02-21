require('dotenv').config()


const config = {
    Port: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    jwtConfig: {
        SECRET: process.env.JWT_SECRET,
        EXPIRESIN: process.env.EXPIRESIN,
        EMAILJWT: process.env.EMAILJWT
    },
    email: {
        USERNAME: process.env.MAILER_USER,
        PASSWORD: process.env.MAILER_PASS
    }
}

module.exports = config