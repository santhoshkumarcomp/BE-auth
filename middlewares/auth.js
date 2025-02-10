require("dotenv").config();
const jwt = require("jsonwebtoken");
const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorize" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
  } catch (error) {
    return res.status(401).send(error.message);
  }
  next();
};

module.exports = isAuthenticated;
