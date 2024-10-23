import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users.js';
import cors from 'cors'
const app=express();

const port=7000;

mongoose.connect('mongodb+srv://mdshaadnizami:fOgTRXZrZuwpSoAj@health-care-1.kppca.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// cors //
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',userRouter);

app.listen(port,()=>{
    console.log('app is running')
})