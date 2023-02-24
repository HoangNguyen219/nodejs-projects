
require('dotenv').config();
require('express-async-errors');


const express = require('express');
const app = express();

const sendEmail = require('./controller/sendEmail');

const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

//middleware
app.use(express.json());

//routes
app.get('/send', sendEmail)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        // await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening on http://localhost:${port}`))

    } catch (error) {
        console.log(error);
    }
}
console.log(module.exports);
console.log(exports);
start()

