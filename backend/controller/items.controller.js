const itemsModel = require('../model/items')
const cloudinary = require('../utils/cloudinary')
const {StatusCodes} = require('http-status-codes')
const fs = require('fs')




async function createProduct(req, res, next) {
    const filepath = req.file.path
    try {
        let itemToSave = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        }
        const img = await cloudinary.uploader.upload(filepath)

        fs.uplink(filepath, (error) => {
            if (error) return
        })

        itemToSave.imgUrl = img.url
        const item = await itemsModel.create(itemToSave)
        
        res.status(StatusCodes.ACCEPTED).json({
            status: true,
            msg: 'Product created successfully',
            item
        })
    } catch (error) {
        next(error)
    }
}

