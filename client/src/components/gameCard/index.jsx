import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addGame } from "../../redux/cartSlice";
import { toast } from "react-hot-toast";
import { MdDone } from "react-icons/md";

const GameCard = ({ game, index }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch({ type: "cart/loadCartFromLocalStorage" });

    return () => {
      dispatch({ type: "cart/saveCartToLocalStorage" });
    };
  }, []);

  const handleAddGame = () => {
    dispatch(addGame(game));
    toast.success(`${game?.name} add to cart`);
  };

  return (
    <Card className="w-full" key={index}>
      <Link to={`/game-detail/${game && game?._id}`}>
        <CardHeader floated={false} className=" h-64">
          <div className=" absolute top-0 left-0 right-0 bottom-0 w-full h-full bg_card_gradient"></div>
          <img
            src={game && game?.cover}
            alt={game && game?.surname}
            className="h-full w-full object-cover"
          />
          <div className="!absolute top-4 right-4 rounded-full flex items-center gap-2 text-lg text-white font-medium">
            <Chip
              size="sm"
              value={game && game?.genre}
              className=" bg-black/50"
            />
          </div>
          <div className="!absolute bottom-4 left-4 rounded-full flex items-center gap-2 text-lg text-white font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-0.5 h-5 w-5 text-yellow-700"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            {game && (game?.rating / 20).toFixed(1)}
          </div>
        </CardHeader>
      </Link>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Link to={`/game-detail/${game && game?._id}`}>
            <Typography color="blue-gray" className="font-medium">
              {game && game?.name}
            </Typography>
          </Link>
          <Typography color="blue-gray" className="font-medium">
            ${game && game?.price}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75 line-clamp-3"
        >
          {game && game?.desc}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        {cart?.find((item) => item?._id === game?._id) ? (
          <Button fullWidth={true} className=" text-green-600 flex items-center justify-center gap-2" >
            Added
            <MdDone/>
          </Button>
        ) : (
          <Button fullWidth={true} onClick={handleAddGame}>
            Add To Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default GameCard;
