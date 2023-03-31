const express = require('express');
const router = express.Router();

const {
    authenticateUser,
    authorizePermissions
} = require('../middlewares/authentication')


const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
} = require('../controller/productController')

router.route('/').post([authenticateUser, authorizePermissions('admin')], createProduct)
    .get(getAllProducts);

router.route('/uploadImage').post([authenticateUser, authorizePermissions], uploadImage);

router.route(':id').get(getSingleProduct)
    .patch([authenticateUser, authorizePermissions('admin')], updateProduct)
    .delete([authenticateUser, authorizePermissions('admin')], deleteProduct)
