const db = require("../../../db/index");


const allCarsForOneUser = async (req, res, next) => {
    try {
        const cars = await db.any(`SELECT * FROM cars JOIN users ON cars.owner_id = users.id WHERE users.id =${req.params.id}`);
        console.log(cars)
        res.json({
            status: "success", 
            message: "All cars for ONE user",
            cars
        })
    } catch (error) {
        next(err);        
    }

}

module.exports = { allCarsForOneUser };