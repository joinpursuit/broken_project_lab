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
    let id = req.params.id
    let car = await db.one("DELETE FROM cars WHERE id=$1 RETURNING *", id);
    res.json({
      status: "success",
      message: "You destroyed the car",
      payload: car
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Unable to delete car",
      payload: null
    })
  }
};

const updateCar = async (req, res, next) => {
  try {
    let info = req.query
    info["id"] = req.params.id
    let car = await db.one(
      "UPDATE cars SET brand = ${brand}, model = ${model}, year = ${year}, owner_id = ${owner_id} WHERE id = ${id} RETURNING *", info);
    res.json({
      status: "success",
      message: "updated one car",
      payload: car
    });
  } catch (err) {
    res.json({
      status: "success",
      message: "Unable to update car",
      payload: null
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
    db.one(
      "UPDATE cars SET " + queryString + " WHERE id=" + req.params.id,
      req.body
    );
    res.json({
      status: "success",
      message: "You Updated a CAR!"
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Unable to update car",
      payload: null
    })
  }
};

module.exports = { createCar, deleteCar, updateCar, updateCarFeature, getSingleCar,getAllCars };
