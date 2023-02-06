const multer = require('multer')
const path = require('path')

// const storage = multer.diskStorage({
//     filename: function(req, file, callback) {
//       callback(null, Date.now() + file.originalname);
//     }
//   });
//   const upload = multer({ storage: storage });

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            cb(new Error('File type is not supported'), false)
            return;
        }
        cb(null, true)
    }
})