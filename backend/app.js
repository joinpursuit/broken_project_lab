const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 6000; 
const carsRouter = require('./routes/cars/cars');
const usersRouter = require('./routes/users/users');
const app = express(); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors);

app.use('/cars', carsRouter);
app.use('/users', usersRouter);

app.use((err, req, res, next) => {
    res.status(500).json({
        status:"error",
        message:"Error was thrown"
    });
    next(err)
});


app.listen(PORT, () => console.log("Listening"));
