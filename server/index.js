const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const app = express()
const port = process.env.PORT || 6001

// Middlewares 
app.use(cors())
app.use(express.json())

// 8Onmn8Bl6SNW6uJ3
// venuchilukala111
/****************************** Mongodb configuration using mongoose*******************************************/
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mega-mart-db.a5sja.mongodb.net/mega-mart-db?retryWrites=true&w=majority&appName=mega-mart-db`).then(console.log("MongoDB connected successfully")).catch((error) => {
    console.log("Error connecting to mongodb", error)
});

/******************************** JWT Token *******************************************************************/
// Get jwt token by user credentials
app.post('/jwt', async (req, res) => {
    const user = req.body
    const token = jwt.sign(user, process.env.SECRET_TOKEN, {
        expiresIn: '1h'
    })
    res.send({ jwt_token: token })
})




/************************Import Routes Here************************************ */
const productRoutes = require('./api/routes/productRoutes');
const storeRoutes = require('./api/routes/storeRoutes');
const cartRoutes = require('./api/routes/cartRoutes')
const userRoutes = require('./api/routes/userRoutes');
const verifyToken = require('./api/middlewares/verifyToken');

app.use('/products', productRoutes)
app.use('/stores', storeRoutes)
app.use('/carts', cartRoutes)
app.use('/users', userRoutes)


app.get('/',verifyToken ,(req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`App is listening at ${port}`)
})