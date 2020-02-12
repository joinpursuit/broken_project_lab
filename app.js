const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express(); 

const port = 3000; 
const carsRouter = require('./backend/routes/cars/cars');
const usersRouter = require('./backend/routes/users/users');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

app.use('/cars', carsRouter);
app.use('/users', usersRouter)

app.use((err, req, res, next) => {
    res.status(500).json({
        err
    })
})


app.listen(port, () => console.log("Listening"));
