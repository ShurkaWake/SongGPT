var express = require("express"),
  router = express.Router(),
  {
    signup,
    signin
  } = require("../controllers/auth.controller.js");

router.post("/register", signup);
router.post("/login", signin);

module.exports = router;