
require('dotenv').config();
require('express-async-errors');


const express = require('express');
const app = express();
const connectDB = require('./db/connect');

const fileupload = require('express-fileupload')

// USE V2!!
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const productRouter = require('./routes/productRoutes');

const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

//middleware
app.use(express.static('./public'))
app.use(express.json());
app.use(fileupload())

//routes
app.use('/api/v1/products', productRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening on http://localhost:${port}`))

    } catch (error) {
        console.log(error);
    }
}

start()
