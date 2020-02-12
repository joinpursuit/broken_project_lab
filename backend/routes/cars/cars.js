const carsRouter = require("express").Router();
const {
  getAllCars,
  getSingleCar,
  createCar,
  deleteCar,
  updateCarFeature,
  updateCar
} = require("../../queries/cars/cars");




carsRouter.get("/", getAllCars);
carsRouter.get("/id", getSingleCar);
carsRouter.post("/", createCar);
carsRouter.delete("/:id", deleteCar);
carsRouter.put("/:id", updateCar);
carsRouter.patch("/:id", updateCarFeature);

module.exports = carsRouter;
