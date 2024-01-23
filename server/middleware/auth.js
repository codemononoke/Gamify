const jwt = require("jsonwebtoken");

const getAccessToRoute = (req, res, next) => {
  const access_token =
    req.cookies.access_token ||
    req.body.access_token ||
    req.header("Authorization").split(" ")[1];

  if (!access_token) {
    return res.status(401).json({
      success: false,
      msg: "Token missing.",
    });
  }

  jwt.verify(access_token, process.env.JWT_SECRET_KEY, (err, dec) => {
    if (err) {
      return res.status(401).json({
        success: false,
        msg: "Token is invalid.",
      });
    }

    req.user = {
      id: dec.id,
    };
    next();
  });
};

module.exports = { getAccessToRoute };
