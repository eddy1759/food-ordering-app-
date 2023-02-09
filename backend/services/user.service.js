const userModel = require('../model/user')
const helper = require('../utils/helper')
const validateUser = require('../utils/user.validate')
const catchAsync = require('../utils/catchAsync')
const {StatusCodes} = require('http-status-codes')
const {uploadFile, destroyFile} = require('../utils/cloudinary')
const dataUri = require('../utils/datauri')

/**
 * @docs Create New User
 * @param {Object} body - Body object data
 * @returns {Object<type|message|statusCode|user>}
 */
const createUser = catchAsync(async (body, profileImg) => {
    console.log(body)
    //!  check if user profile image is provided
    if (profileImg === undefined) {
        return {
            type: Error,
            message: 'Profile image is required, please upload an image!',
            statusCode: StatusCodes.BAD_REQUEST
        }
    }
    const {
        firstname,
        lastname,
        email,
        password,
        passwordConfirmation,
        role
    } = body

    let {phone, address} = body;

    if (!phone) phone = '';
    if (!address) address = '';
    
    //!  check required fields
    if (
        !firstname ||
        !lastname ||
        !email ||
        !password ||
        !passwordConfirmation ||
        !role
    ) {
        return {
            type: 'Error',
            message: 'All fields are required.',
            statusCode: StatusCodes.BAD_REQUEST
        }
    }

    const userExist = await userModel.findOne({
        email: email
    })

    //!  check if user with email already exist
    if (userExist) {
        return {
            type: 'Error',
            message: 'Email is already taken.',
            statusCode : StatusCodes.CONFLICT
        }
    }

    //!  Upload image to cloudinary
    const image = await uploadFile(
        dataUri(profileImg).content,
        600
    )

    //!  Create new user
    const user = await userModel.create({
        firstname,
        lastname,
        email,
        password,
        passwordConfirmation,
        role,
        phone,
        address,
        profileImg : image.url,
        profileImageId: image.public_id
    });

    return {
        type: 'Success',
        message: 'Account created successful, please verify your email!',
        statusCode: StatusCodes.ACCEPTED,
        user
    }
}) 



/**
 * @docs Sign user in
 * @param {Object} body - Body object data
 * @returns {Object<type|message|statusCode|token>}
 */
const logIn = catchAsync(async (body) => {
    const {email, passport} = body
    if (!email || !passport) {
        return {
            type: Error,
            message: 'All fields are required.',
            statusCode: StatusCodes.BAD_REQUEST
        }
    }
    const user = await validateUser(email, passport)
    if (!user) {
        return {
            type: 'Error',
            message: 'User Not Found',
            statusCode: StatusCodes.BAD_REQUEST
        }
    }

    const token = helper.getToken({
        _id: user._id,
        email: user.email
    })

    return {
        type: 'Success',
        message: 'User logged in successfuly.',
        statusCode: StatusCodes.OK,
        token
    }
})



/**
 * @desc Update user details using its ID
 * @param {Object} user - An object contains logged in user data
 * @param {Object} body - Bbody object data
 * @returns {Object<type|message|statusCode|user>}
 */
const updateUserDetails = catchAsync(async (userdata, body) => {
    const {id} = userdata;
    const {password, passwordConfirmation, email} = body;

    //!  check if password and passwordConfirmation are provided
    if (password || passwordConfirmation) {
        return {
            type: 'Error',
            message: 'Cannot update password from here.',
            statusCode: StatusCodes.BAD_REQUEST
        }
    }

    //!  Find user document and update it
   let user = await userModel.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    })

    return {
        type: 'Success',
        message: 'User details updated successfully.',
        statusCode: StatusCodes.OK
    }
})

const updateUserProfileImage = catchAsync(async(userdata, profileImg) => {
    //! check if profile image is provided
    if (profileImg === undefined) {
        return {
            type: 'Error',
            message: 'Profile image is required, please upload an image!',
            statusCode: StatusCodes.BAD_REQUEST
        }
    }

    const {profileImageId, id} = userdata;

    // ! Destroy image from cloudinary
    destroyFile(profileImageId);
 
    // ! Upload Image to cloudinary
    const image = await uploadFile(
        dataUri(profileImg).content,
        600
    ),

    // ! Find user document and update it
    user = await user.findByIdAndUpdate(
        id,
        {
            profileImg: image.url,
            profileImageId: image.public_id
        }
    );

    // ! If everything is Ok, send data
    return {
        type: 'Success',
        message: 'User image updated successfully.',
        statusCode: StatusCodes.OK
    }
})

const deleteUser = catchAsync(async (id) => {
    const user  = await userModel.findById(id);

    // ! Check if user exist
    if (!user){
        return {
            type: 'Error',
            message: 'No user found with this ID.',
            statusbar: StatusCodes.NOT_FOUND
        }
    }

    destroyFile(user.profileImageId)
    await userModel.findByIdAndDelete(id)

    return {
        type: 'Success',
        message: 'Account deleted successfully.',
        statusCode: StatusCodes.OK
    }
})


module.exports = {
    createUser,
    logIn,
    updateUserDetails,
    updateUserProfileImage,
    deleteUser
}


    
    
        
    
        


        