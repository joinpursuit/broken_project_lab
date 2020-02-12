const carsRouter = require("express").Router();
const {
  getAllCars,
  getSingleCar,
  createCar,
  deleteCar,
  updateCarFeature
} = require("../../queries/cars/cars");

carsRouter.get("/", getAllCars);
carsRouter.get("/:id", getSingleCar);
carsRouter.post("/", createCar);
// carsRouter.delete("/cars/:id", deleteCar);
// carsRouter.put("/cars/:id", updateCarFeature);
// carsRouter.patch("/cars/:id", updateCarFeature);

module.exports = carsRouter;
