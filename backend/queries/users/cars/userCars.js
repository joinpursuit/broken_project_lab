const db = require("../../../db/index");


const allCarsForOneUser = async (req, res, next) => {
    try {
        let cars = await db.any("SELECT * FROM cars WHERE owner_id = $1", [req.params.id])
        res.json({
            status: "success", 
            message: "All cars for ONE user",
            payload: cars
        })
    } catch (err) {
        next(err);        
    }

}

module.exports = { allCarsForOneUser };