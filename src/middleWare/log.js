const moment = require('moment');
const log = async (req, res, next) => {
    // blue console.log
    console.log(new Date().getTime())
    console.log("➡️", "\x1b[34m", `TIME: ${moment().format("DD/MM/yyyy hh:mm:ss A")} | PI: ${req.ip} | PATH: ${req.originalUrl}`)
    next();
}

module.exports = log