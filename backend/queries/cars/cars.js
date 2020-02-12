const db = require("../../db/index")

const getAllCars = async (req, res, next) => {
  try {
    const cars = db.any("SELECT * FROM cars");
    res.json({
      status: "success",
      message: "all users",
      body: cars
    });
  } catch (err) {
    // next(err);
    res.json({
      status: "error",
      payload: null,
      message: err
    });
  }
};

const getSingleCar = async (req, res, next) => {
  try {
    let car = await db.one("SELECT * FROM cars WHERE id=$1", [req.params.id]);
    res.json({
      status: "success",
      message: "Received ONE CAR!",
      body: car
    });
  } catch (err) {
    next(err);
  }
};

const createCar = async (req, res, next) => {
  try {
    let newCar = await db.one(
      "INSERT INTO cars (brand, model, year, owner_id) VALUES(${brand}, ${model}, ${year}, ${owner_id} )RETURNING *",
      req.body
    );
    res.json({
      status: "succss",
      message: "New car added",
      body: newCar
    });
  } catch (err) {
    res.json({
      status: "error",
      payload: null,
      message: err
    });
  }
};

const deleteCar = async (req, res, next) => {
  try {
    let result = await db.none("DELETE FROM cars WHERE id=$1", req.params.id);
    res.json({
      status: "success",
      message: "You destroyed the car",
      body: result
    });
  } catch (err) {
    next(err);
  }
};

const updateCar = async (req, res, next) => {
  let info = req.query
  info["id"] = req.params.id
  try {
    let car = await db.one(
      "UPDATE cars SET brand=${brand}, model=${model}, year=${year}, owner_id=${owner_id} WHERE id = ${id}  RETURNING *", info
    );
    res.json({
      status: "success",
      message: "updated one car",
      body: car
    });
  } catch (err) {
    res.status({
      status:"failure",
      message:"Car couldn't get updated",
      body: null
    })
  }
};

const updateCarFeature = async (req, res, next) => {
  try {
    let queryStringArray = [];
    let bodyKeys = Object.keys(req.body);
    bodyKeys.forEach(key => {
      queryStringArray.push(key + "=${" + key + "}");
    });
    let queryString = queryStringArray.join(", ");
    if (req.body.owner_id && req.body.owner_id.toLowerCase() === "null") {
      req.body.owner_id = null;
    }
    if (req.body.year && req.body.year.toLowerCase() === "null") {
      req.body.year = null;
    }

    db.none(
      "UPDATE cars SET " + queryString + " WHERE id=" + req.params.id,
      req.body
    );

    res.json({
      status: "success",
      message: "You Updated a CAR!"
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createCar, deleteCar, updateCar, updateCarFeature, getAllCars, getSingleCar };
