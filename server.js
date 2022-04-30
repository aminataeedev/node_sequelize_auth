const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
require("./src/database/connection");

const authRoutes = require("./src/routes/auth");

const { port } = process.env;

const corsOptions = require("./src/config/cors");
const User = require("./src/models/user");

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        message: err.message,
    });
});

User.sync({ force: true }).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
