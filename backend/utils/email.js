const CONFIG = require('../config/Configs').email
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: CONFIG.USERNAME,
        pass: CONFIG.PASSWORD
    }
})

module.exports = transporter