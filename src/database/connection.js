const sequelize = require("sequelize");

const { db, db_name, host, db_username, db_password } = process.env;

const db_connection = new sequelize(db_name, db_username, db_password, {
    host: host,
    dialect: db,
});

db_connection
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

module.exports = db_connection;
