const carsRouter = require("express").Router();
const {
  getAllCars,
  getSingleCar,
  createCar,
  deleteCar,
  updateCar,
  updateCarFeature
} = require("../../queries/cars/cars");

carsRouter.get("/", getAllCars);
carsRouter.get("/cars/id", getSingleCar);
carsRouter.post("/cars/", createCar);
carsRouter.delete("/cars/:id", deleteCar);
carsRouter.patch("/cars/:id", updateCar);
carsRouter.patch("/cars/:id", updateCarFeature);

module.exports = carsRouter;
