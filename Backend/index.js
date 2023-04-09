//use express
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //middleware used to handle request bodies
const errorController = require('./controllers/error-controller'); //error handling
const mongoose = require('mongoose'); //used to access the MongoDB
require("dotenv").config(); //used to access the .env file easily

//routes from /routes/
const shopRoute = require('./routes/shop-route');
const itemRoute = require('./routes/item-route');
const receiptRoute = require('./routes/receipt-route')
const ocrRoute = require('./routes/ocr-route');
const userRoute = require('./routes/user-route');
const viewReceiptRoute = require('./routes/viewReceipt-route');

//port to listen on from .ENV file
const ports = process.env.PORT || 3000;

//use body parser and ejs
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "ejs");

//connect to MongoDB
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        if (err)
            console.log(err.message)
        else
            console.log('connected to MongoDB')
    });

//endpoints from routes.
app.use('/shop', shopRoute);
app.use('/item', itemRoute);
app.use('/receipt', receiptRoute);
app.use('/ocr', ocrRoute);
app.use('/user', userRoute);
app.use('/view', viewReceiptRoute);

//Default request (display no error)
app.use((req, res) => {
    res.sendStatus(404);
});

//error handling if no route is present etc
app.use(errorController.get404);
app.use(errorController.get500);

//start listening
app.listen(ports, () => console.log('listening...'));

//open browser, uncomment the three lines below for auto open browser
const open = require('open');
const res = require('express/lib/response');
open('http://localhost:3000/');