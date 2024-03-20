require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { StatusCodes } = require('http-status-codes');
const cloudinary = require('cloudinary').v2;

const userRoutes = require('./routers/userRoutes');
const predRoutes = require('./routers/predictionRoutes');
const feedbackRoutes = require('./routers/feedbackRoutes');

const { dbConnect } = require('./db/connectDb');


dbConnect();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const app = express();


app.use(express.json());


app.use(cors({
    origin: '*'
}));


app.get('/', (req, res) => {
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'server of "tomato leaf disease detection" is up and running successfully'
    });
});


app.use(userRoutes);
app.use(predRoutes);
app.use(feedbackRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running at PORT: ${PORT}`);
});