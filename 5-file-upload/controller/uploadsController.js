const { StatusCodes } = require('http-status-codes');
const path = require('path')
const customError = require('../errors')


const uploadProductImage = async (req, res) => {
    if (!req.files) {
        throw new customError.BadRequestError('No File Uploaded');
    }
    const productImage = req.files.image;

    if(!productImage.mimetype.startsWith('image')) {
        throw new customError.BadRequestError('Please Upload Image');
    }

    const maxSize = 1024 * 1024;
    if(productImage.size > maxSize) {
        throw new customError.BadRequestError('Please upload image smaller than 1Kb')
    }


    const imagePath = path.join(__dirname, '../public/uploads' + `/${productImage.name}`);
    await productImage.mv(imagePath, () => {

    })
    res.status(StatusCodes.OK).json({ image: { src: `/uploads/${productImage.name}` } })
}


module.exports = {
    uploadProductImage
}