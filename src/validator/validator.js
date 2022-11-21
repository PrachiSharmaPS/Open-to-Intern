const mongoose = require("mongoose")

const isValidName = function (name) {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name)
}
const isEmpty = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

module.exports = { isEmpty, isValidName}