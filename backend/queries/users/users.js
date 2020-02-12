const db = require("../../db/index");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await db.any("SELECT * FROM users");
    res.json({
      status: "success",
      message: "all users",
      body:users
    });
  } catch (err) {
    next(err);
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    let user = await db.one(`SELECT * FROM users WHERE id=$1`, req.params.id);
    res.json({
      status: "success",
      message: "Received ONE user!",
      body:user
    });
  } catch (err) {
    next(err);
  }
};


const deleteUser = async (req, res, next) => {
  try {
   let destroy =  await db.none("DELETE FROM users WHERE id=$1", req.params.id);
    res.json({
      status: "success",
      message: "You destroyed the user",
      body: destroy
    });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await db.one(
      "INSERT INTO users (username) VALUES(${username}) RETURNING *",
      req.body
    );
    res.json({
      status: "succss",
      message: "New user added",
      body: user
    });
  } catch (err) {
    next(err);
  }
};

const allCarsForOneUser = async (req, res, next) => {
  try {
      const cars = await db.any("SELECT * FROM cars WHERE owner_id =$1", req.params.id)
      res.json({
          status: "success", 
          message: "All cars for ONE user",
          body: cars
      })
  } catch (error) {
      next(err);        
  }

}



module.exports = { getAllUsers, getSingleUser, deleteUser, createUser ,allCarsForOneUser};
