const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')

router.get('/', cartController.getCartByEmail)
router.post('/', cartController.addAndUpdateCart)
router.delete('/:id', cartController.deleteCart)

module.exports = router