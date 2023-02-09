const availableLangs = ['en'];

const messages = {
    en: {
        profileImageRequired: 'Profile image ss required, please upload an image!',
    fieldsRequired: 'All fields are required.',
    passwordLength:
      'Password must be longer than 8 characters and contains letters, numbers, and symbols.',
    roleRestriction: 'Role must be one of the following: user or seller.',
    emailTaken: 'Email is already taken.',
    emailPasswordRequired: 'Please enter both email and password!',
    incorrectEmailOrPassword: 'Incorrect email or password.',
    passConfirm: 'Password and passwordConfirmation must be the same.',
    invalidLink: 'Invalid link or expired',
    notSamePassword:
      'This is not your password. Please enter the correct current password.',
    loginAgain: 'Please login again!',
    noTokenFound: 'No token found.',
    noUserFound: 'No user found.',
    emailVerified: 'Email is already verified.',
    noProductFound: 'No product found with this ID.',
    productExist: 'Product already exits',
    noProductsFound: 'No products found.',
    invalidRequest: 'Invalid request.',
    categoryImageRequired: 'Image is required, please upload an image!',
    noOrders: 'No orders found',
    noOrder: 'No order found',
    noUsersFound: 'No users found.',
    noDiscountCodeFound: 'No discount code found.',
    haveDiscountCode:
      'You have now a discount code, please use it before using another one.',
    noDiscountCodesFound: 'No discount codes found',
    noUserFoundWithID: 'No user found with this ID.',
    notInStatusEnum:
      'Sorry by status must be one of the following: Not Processed, Processing, Shipped, Delivered, Cancelled.',
    passwordUpdateRoute:
      'Cannot update password from here, please go to update password route.',
    successfulSignUp: 'Account created successful, please verify your email!',
    successfulLogin: 'User logged in successfuly.',
    successfulLogout: 'Logged out successfuly.',
    successfulTokenGeneration: 'Tokens generated successfully.',
    successfulPasswordChange: 'Password changed successfully.',
    successfulEmailVerification: 'Email verified successfully.',
    successfulResetLink: 'Reset password link sent successfully.',
    successfulSendVerificationEmail: 'Verification email sent successfully.',
    successfulOrderCreate: 'Order created successfully.',
    successfulOrdersFound: 'Orders found successfully.',
    successfulOrderFound: 'Order found successfully.',
    successfulOrderCancel: 'Order cancelled successfully.',
    successfulProductsFound: 'Products found successfully.',
    successfulProductFound: 'Product found successfully.',
    successfulProductCreate: 'Product created successfully.',
    successfulProductDetails: 'Product detials updated successfully.',
    successfulProductMainImage: 'Product main image updated successfully.',
    successfulProductSubImages: 'Product sub images updated successfully.',
    successfulProductDelete: 'Product deleted successfully.',
    successfulUsersFound: 'Users found successfully.',
    successfulUserFound: 'User found successfully.',
    successfulUserDetails: 'User details updated successfully.',
    successfulUserImage: 'User image updated successfully.',
    successfulUserDelete: 'Account deleted successfully.',
    successfulCodeVerification:
      'Discount code verification completed successfully.',
    successfulDiscountCodesFound: 'Discount codes found successfully.',
    successfulCodeGeneration: 'Discount code generated successfully.',
    successfulStatusUpdate: 'Order status updated successfully.',
    discountCodeDeleted: 'Discount code deleted successfully.',
    discountCodeCanceled: 'Discount code cancelled from order successfully.',
    successfulGetDiscount: 'Discount found successfully.'
    }
}

module.exports = {
    availableLangs,
messages
}