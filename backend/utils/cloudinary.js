require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
})

const destroyFile = (PublicID) => {
        cloudinary.destroy(PublicID, (error, des) => des)
}
const uploadFile = (file, width) => {
        cloudinary.uploader.upload(file, {
                width: width,
                crop: 'fit',
                format: 'webp'
        })
};

module.exports = {
        destroyFile,
        uploadFile
}