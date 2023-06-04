const verifyToken = require("../middlewares/auth.JWT");

var express = require("express"),
  router = express.Router(),
  {
    addSong,
    getSongs,
    deleteSong,
    updateSong,
    getSong,
  } = require("../controllers/song.controller.js");

router.post("/song", verifyToken, addSong);
router.get("/song", verifyToken, getSongs);
router.delete("/song/:id", verifyToken, deleteSong)
router.put("/song/:id", verifyToken, updateSong)
router.get("/song/:id", verifyToken, getSong)

module.exports = router;