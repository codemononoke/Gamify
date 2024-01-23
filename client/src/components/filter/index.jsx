import React from "react";
import {
  Button,
  Chip,
  ButtonGroup,
  IconButton,
} from "@material-tailwind/react";
import RatingIcon from "../../images/Rating.svg";
import { genres } from "../../images";

const Filter = ({ setSelectedFilter }) => {
  return (
    <div className=" flex items-center justify-between w-full gap-3">
      <IconButton
        className=" rounded-full w-full"
        onClick={() => setSelectedFilter("Rating")}
      >
        <img src={RatingIcon} alt="rating" className=" h-full w-full" />
      </IconButton>
      <div className="flex flex-row gap-3 overflow-y-auto">
        {genres.map((genre, index) => (
          <ButtonGroup>
            <Button
              key={index}
              className=" flex h-9 items-center gap-2 justify-center rounded-full"
              onClick={() => setSelectedFilter(genre?.name)}
            >
              <img src={genre?.logo} alt={genre?.name} className=" h-5 w-5" />
              {genre?.name}
            </Button>
          </ButtonGroup>
        ))}
      </div>
      <div className=" flex items-center">
        <Chip
          size=""
          value="Filter: None"
          className=" rounded-full h-9 capitalize bg-white text-black"
        />
        <Button
          size="sm"
          className="h-full min-h-9 rounded-full capitalize w-28"
          onClick={() => setSelectedFilter("None")}
        >
          Clear Filter
        </Button>
      </div>
    </div>
  );
};

export default Filter;
