
const getAllProductsStatic = async(req,res) => {
    throw new Error('testing async errors');
    res.status(200).json({msg: 'all static'})
}

const getAllProducts = async(req,res) => {
    res.status(200).json({msg: 'all'})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}