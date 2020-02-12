const users = require("express").Router();
const { getAllUsers, getSingleUser, deleteUser, createUser } = require("../../queries/users/users");
const userCarRouter = require("./cars/userCars");
users.use("/cars", userCarRouter)

users.get("/", getAllUsers);
users.get("/:id", getSingleUser);
users.delete("/:id", deleteUser);
users.post("/", createUser)

module.exports = users;
