const userModel = require('../model/user')
const validateUser = require('../utils/user.validate')
const helper = require('../utils/helper')
const image = require('../utils/cloudinary')
const transporter = require('../utils/email')
const {promisify} = require('util')
const fs = require('fs')
/**
 * @desc - A class service for hadnling user related operation
 */
class UserService {
    async createUser(userData) {
        let userEmail = userData.email;
        const userExist = await userModel.findOne({
            userEmail
        })
        if (userExist) {
            throw new Error("User already exist")
        }
        

        const createdUser = await userModel.create(userData)
        return createdUser;
    }

    async loginUser(email, password) {
        const user = validateUser(email, password)
        if (!user) {
            throw new Error("Invalid Email or Password")
        }

        const token = helper.getToken({userid: user._id})
        return token;
    }

    async updateUser(userId, user) {
        const updatedUser = await userModel.findByIdAndUpdate(userId, user, {new: true})
        if (!updatedUser) {
            throw new Error("User not found");
        }
        return updatedUser;
    }

    async uploadProfileIlmage(imgFile) {
        const {public_id, url} = await image.uploadFile(imgFile.path)

        fs.unlinkSync(imgFile.path)
        return {
            profileImgId: public_id,
            profileImg: url
        }
    }

    async sendVerificationEmail(email, token) {
        const verifyLink = `http://localhost:3000/verify/${token}`;
        const mailOpts = {
            from: "eddytech07@gmail.com",
            to: email,
            subject: "Verify your email",
            html: `Please click this link to verify your email: <a href="${verifyLink}">${verifyLink}</a>`,
        }
        const sendMail = promisify(transporter.sendMail).bind(transporter)
        await sendMail(mailOpts)
    }

    async getUsers() {
        const users = userModel.find({})
        return users
    }
}


module.exports = UserService;