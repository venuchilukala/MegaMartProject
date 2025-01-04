const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const verifyToken = require('../middlewares/verifyToken')

router.get('/',verifyToken ,cartController.getCartByEmail)
router.post('/', cartController.addAndUpdateCart)
router.delete('/:productId', cartController.deleteProduct);
router.delete('/:id', cartController.deleteCart)

module.exports = router