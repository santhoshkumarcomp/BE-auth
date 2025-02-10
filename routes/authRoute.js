const express = require("express");
const {
  register,
  login,
  logout,
  me,
} = require("../controllers/authController");
const isAuthenticated = require("../middlewares/auth");
authRouter = express.Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.get("/me", isAuthenticated, me);

module.exports = authRouter;
