const db = require("../../db/index.js");

const getAllUsers = async (req, res, next) => {
  try {
    let users = await db.any("SELECT * FROM users");
    res.json({
      status: "success",
      message: "all users",
      payload: users
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "could not get all users",
      payload:null
    })
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    let id = req.params.id
    let user = await db.one("SELECT * FROM users WHERE id=$1",id);
    res.json({
      status: "success",
      message: "Received ONE user!",
      payload: user
    });
  } catch (err) {
    res.json({
      status: "success",
      message: "Unable to get one user",
      payload: null
    })
  }
};


const deleteUser = async (req, res, next) => {
  try {
    let id = req.params.id
    let car =await db.none("DELETE FROM users WHERE id=$1", id);
    res.json({
      status: "success",
      message: "You destroyed the user",
      payload:car
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Unable to delete user",
      payload: null
    })
  }
};

const createUser = async (req, res, next) => {
  try {
     let user = await db.one(
      "INSERT INTO users (username) VALUES(${username}) RETURNING *",
      req.body
    );

    res.json({
      status: "success",
      message: "New user added",
      payload: user
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Unable to create user",
      payload: null
    });
  }
};



module.exports = { getAllUsers, getSingleUser
   , deleteUser
  , createUser 
};
