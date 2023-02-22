const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes');

const createProduct = async(req,res) =>{
    res.send('create');
}

const getAllProducts = async(req,res) =>{
    res.send('getAll');
}

module.exports = {
    createProduct,
    getAllProducts
}