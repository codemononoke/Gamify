import React from "react";
import GameCard from "../gameCard";

const GameCards = ({ games }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {games?.map((game, index) => (
        <GameCard game={game} index={index} />
      ))}
    </div>
  );
};

export default GameCards;
