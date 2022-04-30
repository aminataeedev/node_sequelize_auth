const jwt = require("jsonwebtoken");
const { secret } = process.env;

const tokenMaker = (email, _secret = secret) => {
    return jwt.sign({ email }, _secret, { expiresIn: "1d" });
};

const tokenValidator = (email, token) => {
    return jwt.verify();
};

module.exports = { tokenMaker, tokenValidator };
