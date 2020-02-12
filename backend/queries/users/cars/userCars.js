const db = require("../../../db/index");


const allCarsForOneUser = async (req, res, next) => {
    try {
        const cars = await db.any("SELECT * FROM cars JOIN users ON users.id = cars.owner_id WHERE cars.owner_id = $1", req.params.id)
        res.json({
            console:req.params.id,
            status: "success", 
            message: "All cars for ONE user",
            cars
        })
    } catch (error) {
        next(error);        
    }

}

module.exports = { allCarsForOneUser };