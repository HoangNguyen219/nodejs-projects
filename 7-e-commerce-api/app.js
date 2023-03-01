require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const connectDB = require('./db/connect')

const authRouter = require('./routes/authRoutes')

const notFoundMiddleware = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.get('/api/v1', (req, res) => {
    console.log(req.signedCookies);
    res.send('hello')
})

app.use('/api/v1/auth', authRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`listening on http://localhost:${port}`))
    } catch (error) {
        console.log(error);
    }
}


start()
