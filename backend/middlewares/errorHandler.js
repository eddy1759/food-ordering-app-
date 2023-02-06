
const errorHandler = (error, req, res, next) => {
    switch (error.name) {
        case "BadRequestError":
            res.status(400);
            break;
        
        case "UnauthorizedError":
            res.status(401);
            break;
        
        case "ForbiddenError":
            res.status(403);
            break;

        case "NotFoundError":
            res.status(404);
            break;

        default:
            res.status(500);
            break;
    }

    console.error(error)
    res.json({
        message: error.message
    })
}

module.exports = errorHandler