
require('dotenv').config();
require('express-async-errors');

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xxs-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();
const authenticateUser = require('./middlewares/authentication');
const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15*60*1000, //15 minutes
    max: 100 //limit each IP to 100 requests per windowMs
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

//routers
const authRouter = require('./routes/auth');
const jobRouter = require('./routes/job');

//routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);

//middleware
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
