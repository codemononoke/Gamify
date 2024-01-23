const router = require("express").Router();
const {
  getAllGames,
  getGameById,
} = require("../controllers/games.controllers");

router.get("/getAllGames", getAllGames);
router.get("/getGameById/:id", getGameById);

module.exports = router;
