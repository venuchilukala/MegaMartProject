const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()

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

/************************Import Routes Here************************************ */
const productRoutes = require('./api/routes/productRoutes');
const storeRoutes = require('./api/routes/storeRoutes');
const cartRoutes = require('./api/routes/cartRoutes')

app.use('/product', productRoutes)
app.use('/store', storeRoutes)
app.use('/cart', cartRoutes)

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`App is listening at ${port}`)
})