const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 3000; 
const app = express(); 


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

const carsRouter = require('./routes/cars/cars.js');
const usersRouter = require('./routes/users/users.js');




app.use('/cars', carsRouter);
app.use('/users', usersRouter);



app.use((err, req, res, next) => {
    res.status(500).json({
        err
    })
})


app.listen(PORT, () => console.log("Listening on "+PORT));
