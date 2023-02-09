const multer = require('multer')
const path = require('path')
const AppError = require('./appError')

const storage = multer.memoryStorage();

// const storage = multer.diskStorage({
//     filename: function(req, file, callback) {
//       callback(null, Date.now() + file.originalname);
//     }
//   });
//   const upload = multer({ storage: storage });

const limits = {
    fileSize: 1024 * 1024
}

const fileFilter = (req, file, cb) => {
        let ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.JPG' ||ext !== '.jpeg' || ext !== '.JPEG' ||ext !== '.png' ||ext !== '.PNG' ||ext !== '.webp' ||ext !== '.WEBP') {
            cb(new Error('File type is not supported'), false)
            return;
        }
        cb(null, true)
}

/**
 * Upload single image
 * @param {String} name
 */ 

const singleFile = (name) => (req, res, next) => {
    const upload = multer({
        storage,
        limits,
        fileFilter,
    }).single(name)

    upload(req, res, (error) => {
        if(error instanceof multer.MulterError) {
            if (error.code === 'LIMIT_UNEXPECTED_FILE') {
                return next(new AppError(`Cannot Upload More Than 1 Image`, 500))
            }
        }

        if (error) return next(new AppError(error, 500))
        next()
    })
}

module.exports = singleFile