/**
 * @desc A http logger middleware
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - next function
 */
function httpLoggerMW(req, res, next) {
    console.log(`${req.method} ${req.originalUrl}`)
    console.log(`IP Address:  ${req.ip}`)
    console.log(`Headers: ${JSON.stringify(req.headers)}`)

    const start = Date.now();
    res.on("finsih", () => {
        const elapsed = Date.now() - start;
        console.log(`status: ${res.statusCode}`)
        console.log(`Elapsed time: ${elapsed} ms`)
    })
    next()
}

module.exports = httpLoggerMW;