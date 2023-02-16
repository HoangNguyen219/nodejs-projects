
const Product = require('../models/products');

//Test
const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({ featured: true });
    res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
    let query = req.query;
    if (query.name) {
        query.name = { $regex: query.name, $options: 'i' }
    }
    let result = Product.find(query);
    if (query.sort) {
        const sortList = query.sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    else {
        result = result.sort('createAt');
    }
    if (query.fields) {
        const fieldsList = query.fields.split(',').join(' ');
        result = result.select(fieldsList);
    }
    const page = Number(query.page) || 1;
    const itemPerPage = 10;
    const limit = Number(query.limit) || itemPerPage;
    const skip = (page - 1) * itemPerPage;
    result = result.skip(skip).limit(limit);

    const products = await result;
    console.log(query);
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}