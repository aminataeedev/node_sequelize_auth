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

app.use("/auth", authRoutes);

User.sync({ force: true }).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
