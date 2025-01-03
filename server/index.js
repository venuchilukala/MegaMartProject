const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express()

/****************************************** Middleware **************************************************************/

app.use(cors())
app.use(express.json())


const port = process.env.PORT || 6001

/****************************************** MongoDB ***************************************************************/

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mega-mart.acekk.mongodb.net/?retryWrites=true&w=majority&appName=mega-mart`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        // Database & Collections 
        const productCollections = client.db("mega-mart-client").collection("products");
        const cartCollections = client.db("mega-mart-client").collection("cartItems");

        // All Products Operations
        app.get('/product', async (req, res) => {
            const result = await productCollections.find().toArray();
            res.send(result)
        })

        // All Cart Operations 
        // Add items to cart
        app.post('/carts', async (req, res) => {
            const cartItem = req.body
            const result = await cartCollections.insertOne(cartItem)
            res.send(result)
        })

        // Get cart data 
        app.get('/carts', async (req, res) => {
            const email = req.query.email;
            const filter = {email : email}
            const result = await cartCollections.find(filter).toArray()
            console.log(result)
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`App is listening at 6001`)
})

// 3DazMenNmeTCuc3H
// venuchilukala111