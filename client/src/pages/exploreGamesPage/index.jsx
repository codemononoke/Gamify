import React, { useEffect, useState } from "react";
import GameCards from "../../components/gamesCards";
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../../api/apiConnector";
import { gamesEndpoints } from "../../api/apis";
import { setGames, setLoading } from "../../redux/gamesSlice";
import Filter from "../../components/filter";
import { Typography } from "@material-tailwind/react";
import Loader from "../../components/loader";

const ExploreGamesPage = () => {
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState("None");
  const [shownGames, setShownGames] = useState([]);
  const { games, loading } = useSelector((state) => state.games);

  useEffect(() => {
    const getAllGames = async () => {
      dispatch(setLoading(true));
      try {
        const response = await apiConnector(
          "GET",
          gamesEndpoints.GET_ALL_GAMES_API
        );

        if (!response.data.success) {
          throw new Error(response.data.msg);
        }

        console.log("GET_ALL_GAMES_API RESPONSE.......", response);
        dispatch(setGames(response?.data?.games));
      } catch (error) {
        console.log("GET_ALL_GAMES_API API ERROR.....", error);
      }
      dispatch(setLoading(false));
    };
    getAllGames();
  }, [dispatch]);

  useEffect(() => {
    if (selectedFilter === "None") {
      setShownGames(games);
    } else if (selectedFilter !== "Rating") {
      let filteredShownGames = games.filter(
        (game) => game?.genre === selectedFilter
      );
      setShownGames(filteredShownGames);
    } else if (selectedFilter === "Rating") {
      let filterShownGames = games.slice(0);
      let filteredShownGames = filterShownGames.sort(function (a, b) {
        return b.rating - a.rating;
      });
      setShownGames(filteredShownGames);
    }
  }, [games, selectedFilter]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className=" w-full max-w-[1320px] h-full mx-auto px-4 lg:px-8 mt-[40px] ">
      <div className=" flex flex-col items-start gap-4">
        <div className=" flex flex-col items-start gap-1 border-b-2 w-full pb-3">
          <Typography variant="h2" className=" text-black font-bold text-2xl">
            Explore Games
          </Typography>
          <Typography
            variant="p"
            className=" text-gray-600 font-normal text-sm"
          >
            Unlock the Unknown: Dive into a World of Endless Exploration!
          </Typography>
        </div>
        <Filter setSelectedFilter={setSelectedFilter} />
      </div>
      <GameCards games={shownGames} />
    </div>
  );
};

export default ExploreGamesPage;
