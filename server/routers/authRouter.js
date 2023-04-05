const express = require("express");
const {
  postLogin,
  logOut,
  postRegister,
  forgotPassword,
  newPassword,
  getSession,
} = require("../contollers/authController");
const router = express.Router();

router.post("/login", postLogin);
router.get("/logout", logOut);

router.post("/register", postRegister);

router.post("/forgotPass", forgotPassword);
router.put("/newPass", newPassword);

router.get("/getSession", getSession);

module.exports = router;
