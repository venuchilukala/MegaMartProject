const User = require('../models/User')

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Create a new user 
const creteUser = async (req, res) => {
    try {
        const user = req.body
        const query = { email: user.email }
        const existingUser = await User.findOne(query)
        if(existingUser){
            return res.status(302).json({message : "User already exists wit this email!"})
        }
        const result = await User.create(user)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// Delete a user 
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id 
        const deletedUser = await User.findByIdAndDelete(userId)
        if(!deletedUser){
            return res.status(404).json({message : "User not found"})
        } 
        res.status(200).json({message : "User deleted successfully"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// get admin
const getAdmin = async (req, res) => {
    try {
        const email = req.params.email 
        const query = {email : email}

        const user = await User.findOne(query)
        if(email !== req.decoded.email){
            return res.status(403).json({message : "Forbidden Access"})
        }

        let admin = false
        if(user){
            admin = user?.role === "admin"
        }
        res.status(200).json({admin})

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// get storeOwner
// const getStoreOwner = async (req, res) => {
//     try {
//         const email = req.params.email 
//         const query = {email : email}

//         const user = await User.findOne(query)
//         if(email !== req.decoded.email){
//             return res.status(403).json({message : "Forbidden Access"})
//         }

//         let storeOwner = false
//         if(user){
//             storeOwner = user?.role === "storeOwner"
//         }
//         res.status(200).json({storeOwner})

//     } catch (error) {
//         res.status(500).json({message : error.message})
//     }
// }

// changeUserRole 
const changeUserRole = async (req, res) => {
    try {
        const userId = req.params.id;
        const {name, email, photoURL, role, cart} = req.body 

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {role : role},
            {new : true , runValidators : true}
        );

        if(!updatedUser){
            return res.status(404).json({message : "Usr not found"})
        }
        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}


module.exports = {
    getAllUsers,
    creteUser,
    deleteUser,
    getAdmin,
    getStoreOwner,
    changeUserRole,
}