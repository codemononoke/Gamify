const Games = require("../models/games.model");
const games = require("../data/games.json");

const seedGames = async () => {
  try {
    await Games.deleteMany();
    console.log("Games are deleted!");

    await Games.insertMany(games);
    console.log("All games a added!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedGames;
