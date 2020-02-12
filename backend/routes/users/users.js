const userRouter = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  deleteUser,
  createUser,
  
} = require("../../queries/users/users");
const userCarRouter = require("./cars/userCars.js");

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getAllUsers);
userRouter.delete("/:id", deleteUser);
userRouter.post("/", createUser)
userRouter.use("/:id/cars", userCarRouter)

module.exports = userRouter;
