const Games = require("../models/games.model");
const asyncHandler = require("express-async-handler");

const getAllGames = asyncHandler(async (req, res) => {
  try {
    const games = await Games.find({});
    return res.status(200).json({
      success: true,
      games,
      msg: "Get all games successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Failing to get all games",
      error: error,
    });
  }
});

const getGameById = asyncHandler(async (req, res) => {
  try {
    const game = await Games.findById(req.params.id);
    return res.status(200).json({
      success: true,
      game,
      msg: "Get game by id successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Failing to get game by id",
      error: error,
    });
  }
});

module.exports = { getAllGames, getGameById };
