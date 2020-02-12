const carsRouter = require("express").Router();
const  { createCar, deleteCar, updateCar, updateCarFeature, getAllCars, getSingleCar }= require("../../queries/cars/cars");

carsRouter.get("/", getAllCars);
carsRouter.get("/:id", getSingleCar);
carsRouter.post("/", createCar);
carsRouter.delete("/cars/:id", deleteCar);
carsRouter.put("/cars/:id", updateCar);
carsRouter.patch("/cars/:id", updateCarFeature);

module.exports = carsRouter;
