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


const uploadFile = async (imgFile) => {
    const response = await cloudinary.uploader.upload(imgFile);

    if (!response) {
      throw new Error(`Could not upload file to Cloudinary: ${error}`);
    }

    return response.public_id, response.url;
    
};

module.exports = { destroyFile, uploadFile };