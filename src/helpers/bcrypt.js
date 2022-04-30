const bcrypt = require("bcrypt");

const encrypt = (inputValue) => {
    return bcrypt.hash(inputValue, 10);
};

const compare = (newValue, oldValue) => {
    return bcrypt.compare(newValue, oldValue);
};

module.exports = { encrypt, compare };
