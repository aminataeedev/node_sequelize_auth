const User = require("../models/user");
const jwtHelpers = require("../helpers/jwt");
const bcryptHelpers = require("../helpers/bcrypt");
const { requestValidator } = require("../helpers/errorHandler");

const register = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
    requestValidator(req, res);
    const findUser = await User.findOne({ where: { email } });
    if (findUser) {
        return res.status(409).json({ status: "failed", message: "This email has already been registered." });
    }
    const encryptedPassword = await bcryptHelpers.encrypt(password, 10);
    const user = await User.create({
        firstname,
        lastname,
        email,
        password: encryptedPassword,
    });
    const token = await jwtHelpers.tokenMaker(user.email);
    user.token = token;
    return res.status(201).json(user);
};
const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    requestValidator(req, res);
    const findUser = await User.findOne({ where: { email: email } });
    if (!findUser) return res.status(404).json({ status: "failed", message: "Email or password is wrong" });
    const comparePassword = await bcryptHelpers.compare(password, findUser.password);
    if (!comparePassword) {
        return res.status(400).json({ status: "failed", message: "Incorrect Password !" });
    }
    const token = await jwtHelpers.tokenMaker(findUser.email);
    return res.status(200).json({ token });
};

module.exports = { register, signIn };
