const db = require("../../db/index");

const getAllCars = async (req, res, next) => {
  try {
    const cars =  await db.any("SELECT * FROM cars");
    res.json({
      status: "success",
      message: "all cars",
      cars
    });
  } catch (err) {
    next(err);
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
      car
    });
  } catch (err) {
    next(err);
  }
};

const createCar = async (req, res, next) => {
  try {
    await db.none(
      "INSERT INTO cars (brand, model, year, owner_id) VALUES(${brand}, ${model}, ${year}, ${owner_id} )",
      req.body
    );
    res.json({
      status: "succss",
      message: "New car added"
    });
  } catch (err) {
    next(err)
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
      result: result
    });
  } catch (err) {
    next(err);
  }
};



const updateCar = async (req, res, next) => {
  try {
    let car = await db.one(
      "UPDATE cars SET brand=$1, model=$2, year=$3, owner_id=$4 WHERE id = $5 RETURNING *",
    
      [req.body.brand, req.body.model, req.body.year, req.body.owner_id, req.params.id]
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
   await db.none(
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

module.exports = { getAllCars, getSingleCar, createCar, deleteCar, updateCar, updateCarFeature };
