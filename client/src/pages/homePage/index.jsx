import React from "react";
import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { IoMdArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <figure className="relative h-[calc(100vh-83.0667px)] w-full">
      <img
        className="h-full w-full  object-cover object-center"
        src="https://gmedia.playstation.com/is/image/SIEPDC/street-fighter-6-hero-banner-desktop-01-en-07dec22?$4000px$"
        alt="game_poster"
      />
      <div className=" w-full h-full absolute top-0 left-0 right-0 bottom-0 bg_gradient "></div>
      <figcaption className="absolute top-1/2 -translate-y-1/2 left-2/4 flex flex-col w-full max-w-[1320px] -translate-x-2/4   px-4 lg:px-8 ">
        <div className=" w-full lg:w-[600px] flex flex-col gap-4 items-center lg:items-start">
          <Typography
            variant="h1"
            className=" text-white text-6xl lg:text-8xl font-blackOps line-clamp-3 text-center lg:text-start leading-[60px] lg:leading-[80px] "
          >
            Discover buy game from us
          </Typography>
          <Typography
            variant="p"
            className=" text-gray-400 text-sm lg:text-lg text-center lg:text-start"
          >
            Play hundreds of incredible PS5, PS4 and classic PlayStation games,
            and discover epic adventures, unique indies, family favourites, and
            everything in between.
          </Typography>
          <Link to="/explore-games">
            <Button
              size="lg"
              className=" bg-white text-black mt-4 flex items-center"
            >
              Explore Games
              <IoMdArrowRoundForward className=" text-lg" />
            </Button>
          </Link>
        </div>
      </figcaption>
    </figure>
  );
};

export default HomePage;
