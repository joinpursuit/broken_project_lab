const userRouter = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  deleteUser,
  createUser
} = require("../../queries/users/users");
const userCarRouter = require("./cars/userCars");

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getSingleUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/", createUser)
userRouter.use("/", userCarRouter)

module.exports = userRouter;
