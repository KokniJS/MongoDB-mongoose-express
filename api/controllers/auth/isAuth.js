const jwt = require("jwt-simple");
const config = require("../../config");
const router = require("./auth");

const isAuth = (req, res, next) => {
  if (!req.headers["token"]) {
    return res.sendStatus(401);
  } else {
    try {
      req.jwt = jwt.decode(req.headers["token"], config.secretkey);
    } catch (err) {
      return res.sendStatus(400);
    }

    return next();
  }
};

module.exports = isAuth;
