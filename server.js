// Created Server For Testing........

// var http = require('http');

// http.createServer(function (request, response) {

//     // 200 - Success
//     // 400 - Program Error
//     // 500 - Server Problem

//     response.writeHead(200, {
//         'Content-Type': 'text/plain'
//     });
//     response.end("Hello Node");
// }).listen(3000, console.log("Server is Running"));

const express = require('express');
const colors = require('colors');
const morgan = require('morgan');

const dotenv = require('dotenv');
const connectDB = require('./config/db');

const app = express();

// Use of Middleware
// app.use((req, res, next) => {
//     console.log("Middleware Ran...");
//     req.title = "Student";
//     next();
// });

// Use of Morgan
app.use(morgan('dev'));

app.use(express.json({}));
app.use(express.json({
    extended: true
}))

dotenv.config({
    path: './config/config.env'
});

// console.log(process.env.MONGO_URI);

connectDB();

// app.get('/todo', (req, res) => {
//     res.status(200).json({
//         "name": "Aniket",
//         // "title": req.title
//     });
// });

// https://localhost:3000/api/todo/auth/register

app.use('/api/todo/auth', require('./routes/user'));

const PORT = process.env.PORT || 3000;

app.listen(PORT,
    console.log(`Server is Running on: ${PORT}`.red.underline.bold));