const db = require("../../db/index.js");

const getAllCars = async (req, res, next) => {
  try {
    let cars = await db.any("SELECT * FROM cars");
    res.json({
      status: "success",
      message: "all cars",
      payload: cars
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Unable to get all cars",
      payload: null
    });
  }
};

const getSingleCar = async (req, res, next) => {
  try {
    let id = req.params.id
    let car = await db.one("SELECT * FROM cars WHERE id = $1", id);
    res.json({
      status: "success",
      message: "Received ONE CAR!",
      payload: car
    });
  } catch (err) {
    res.json({
      status: "success",
      message: "Unable to get one car",
      payload: null
    })
  }
};

const createCar = async (req, res, next) => {
  try {
    let car = await db.one( "INSERT INTO cars (brand, model, year, owner_id) VALUES(${brand}, ${model}, ${year}, ${owner_id}) RETURNING *", req.body);
    res.json({
      status: "success",
      message: "New car added",
      payload: car
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Unable to create car",
      payload: null
    });
  }
};

const deleteCar = async (req, res, next) => {
  try {
    let result = await db.result("DELETE FROM cars WHERE id=$1", req.params.id);
    res.json({
      status: "success",
      message: "You destroyed the car",
      result: result
    });
  } catch (err) {
    next(err);
  }
};

const updateCar = async (req, res, next) => {
  try {
    let car = await db.one(
      "UPDATE cars SET brand=${brand}, model=${model}, year=${year}, owner_id=${owner_id} RETURNING *",
      {
        owner_id: parseInt(req.body.owner_id),
        brand: req.body.brand,
        year: parseInt(req.body.year),
        model: req.body.model,
        id: parseInt(req.params.id)
      }
    );
    res.json({
      status: "success",
      message: "updated one car",
      car
    });
  } catch (err) {
    next(err);
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

module.exports = { createCar, deleteCar, updateCar, updateCarFeature, getSingleCar,getAllCars };
