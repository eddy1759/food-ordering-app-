const multer = require('multer')
const upload = multer({dest: "uploads/"})

function uploadSingleImage(req, res, next) {
  upload.single("profileImage")(req, res, function (error) {
    if (error) {
      next(error)
    }
    else {
      next()
    }
  })
}

module.exports = uploadSingleImage