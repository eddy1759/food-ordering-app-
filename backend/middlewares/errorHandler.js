/**
 * @desc - An error handler middleware
 * @param {Object} error - Error object
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {function} next - next function
 */
const errorHandler = (error, req, res, next) => {
    console.error(error)
    res.status(500).json({
        message: error.message
    })
}

module.exports = errorHandler