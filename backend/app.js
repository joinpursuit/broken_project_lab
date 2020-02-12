const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express(); 
app.use(cors());
const port = 3000; 


const carsRouter = require('./routes/cars/cars');
const usersRouter = require('./routes/users/users');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/cars', carsRouter);
app.use('/users', usersRouter)

app.use((err, req, res, next) => {
    res.status(200).json({
        err
    })
})

app.listen(port, () => console.log("Listening"));
