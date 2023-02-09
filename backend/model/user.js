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
    passwordConfirmation: {
        type: String,
        required: true,
        validate: {
            validator: function(el) {
                return el === this.password;
        }
        }
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    isEmailVerified: {
        type: Boolean,
        default:false
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    profileImg: {
        type: String,
        required: true
    },
    profileImageId: {
        type: String
    },
    discountCode: {
        type: String
    }},
    {timestamps: true}
)

userSchema.pre('save', async function hashedPassword (next) {
    // Oonly run this function if password was actually modified
    if (!this.isModified('password')) return next();
    // passport hashing
    const hash = await bcrypt.hash(this.password, 10)

    this.password = hash;
    // Delete passwordConfirmation field
    this.passwordConfirmation = undefined
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