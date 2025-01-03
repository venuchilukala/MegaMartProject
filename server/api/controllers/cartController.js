const Cart = require('../models/Cart')

// get cart by email
const getCartByEmail = async (req, res) => {
    try {
        const email = req.query.email;
        const query = {email : email}
        const result = await Cart.findOne(query).exec()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// post a cart 
const addAndUpdateCart = async (req, res) => {
    const { productId, quantity, email } = req.body;
    try {
        let cart = await Cart.findOne({ email });

        if (!cart) {
            cart = new Cart({
                email,
                products: [{ product: productId, quantity }],
            });
        } else {
            const productIndex = cart.products.findIndex(
                (item) => item.product.toString() === productId
            );

            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }
        }
        cart.updatedAt = Date.now();
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete a cart 
const deleteCart = async (req, res) => {
    const cartId = req.params.id 
    try {
        const deletedCart = await Cart.findByIdAndDelete(cartId)
        if(!deletedCart){
            return res.status(401).json({message : "Cart Item not found"})
        }
        res.status(200).json({message : "Cart Item deleted successfully!"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }

}


module.exports = {
    getCartByEmail,
    addAndUpdateCart,
    deleteCart,
}