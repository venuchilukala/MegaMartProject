const Product = require("../models/Product")

const getAllProducts = async (req, res) =>{
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message : error.message })
    }
}

const getProduct = async (req, res) => {
    try {
        const productId = req.params.id 
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({message : "Product not found"})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message : error.message })
    }
}

module.exports = {
    getAllProducts,
    getProduct

}