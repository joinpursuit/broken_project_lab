const userCarsRouter = require("express").Router({mergeParams: ""});
const { allCarsForOneUser } = require("../../../queries/users/cars/userCars");

userCarsRouter.get("/:id", allCarsForOneUser)

module.exports = userCarsRouter;
