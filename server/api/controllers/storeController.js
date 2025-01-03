const Store = require("../models/Store")

const getAllStores = async (req, res) =>{
    try {
        const stores = await Store.find({})
        res.status(200).json(stores)
    } catch (error) {
        res.status(500).json({message : error.message })
    }
}

module.exports = {
    getAllStores

}