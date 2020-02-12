const userRouter = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  deleteUser,
  createUser,
  allCarsForOneUser
} = require("../../queries/users/users");
const userCarRouter = require("./cars/userCars");

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getSingleUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/", createUser)
//userCarsRouter.get("/:id/cars", userCarRouter)
userRouter.get("/:id/cars", allCarsForOneUser)

module.exports = userRouter;
