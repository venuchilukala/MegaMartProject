const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/' ,userController.getAllUsers);
router.post('/', userController.creteUser);
router.delete('/:id', userController.deleteUser)
router.get('/admin/:email', userController.getAdmin)
router.patch('/admin/:id', userController.changeUserRole)

module.exports = router