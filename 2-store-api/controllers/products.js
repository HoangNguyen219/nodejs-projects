
const Product = require('../models/products');


const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({ featured: true });
    res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
    let query = req.query;
    if(query.name) {
        query.name = {$regex: query.name, $options: 'i'}
    }
    let result = await Product.find(query);
    if(query.sort) {
        const sortList = query.sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    else {
        result = result.sort('createAt');
    }
    const products = await result;
    console.log(query);
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}