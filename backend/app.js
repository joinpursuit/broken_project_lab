const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();
const carsRouter = require('./routes/cars/cars');
const usersRouter = require('./routes/users/users');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((err, req, res, next) => {
    if (err.status) {
        res.status(err.status).json(err.error)
    } else {
        res.json(err)
    }
})
app.use('/cars', carsRouter);
app.use('/users', usersRouter)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log("Listening"));
