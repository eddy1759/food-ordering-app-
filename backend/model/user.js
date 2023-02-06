const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    usertype: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    DOB: {
        type: Date,
        max: Date.now()
    },
    address: {
        type: String,
        required: true,
    },
    profileImg: {
        type: String
    }},
    {timestamps: true}
)

userSchema.pre('save', async function hashedPassword (next) {
    const hash = await bcrypt.hash(this.password, 10)

    this.password = hash;
    next()
})

userSchema.methods.isValidPassword = function(plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};

userSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        delete returnedObj.__v
        delete returnedObj.password
    }
})

const userModel = mongoose.model('user', userSchema);
module.exports = userModel