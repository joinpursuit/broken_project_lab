const pgp = require("pg-promise")(());

const db = require("postgress://localhost:5432/broken_project");

module.exports = { db }; 

