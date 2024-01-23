import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGame, setLoading } from "../../redux/gamesSlice";
import { toast } from "react-hot-toast";
import { apiConnector } from "../../api/apiConnector";
import { gamesEndpoints } from "../../api/apis";
import {
  Carousel,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Collapse,
} from "@material-tailwind/react";
import { FaArrowLeft } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import Loader from "../../components/loader";
import { MdDone } from "react-icons/md";
import { addGame } from "../../redux/cartSlice";

const GameDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { game, loading } = useSelector((state) => state.games);
  const { cart } = useSelector((state) => state.cart);
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    const getGameById = async () => {
      dispatch(setLoading(true));
      try {
        const response = await apiConnector(
          "GET",
          `${gamesEndpoints.GET_GAME_BY_ID_API}/${id}`
        );

        if (!response.data.success) {
          throw new Error(response.data.msg);
        }

        dispatch(setGame(response?.data?.game));
      } catch (error) {
        console.log("GET_GAME_BY_ID_API API ERROR........", error);
        toast.error(error);
      }
      dispatch(setLoading(false));
    };
    getGameById();
  }, [dispatch, id]);

  const handleAddGame = () => {
    dispatch(addGame(game));
    toast.success(`${game?.name} add to cart`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className=" w-full max-w-[1320px] h-full  mx-auto px-4 lg:px-8 mt-[20px]">
      <div className=" flex items-center justify-between w-full">
        <Link to="/explore-games">
          <FaArrowLeft className=" text-xl sm:text-3xl" />
        </Link>
        <Typography variant="h1" className=" text-xl sm:text-4xl">
          {game && game?.name}
        </Typography>
      </div>
      <div className=" flex flex-col lg:flex-row items-start gap-5 mt-4">
        <div>
          <Carousel autoplay={true} loop={true} className="rounded-xl">
            {game &&
              game?.footage?.map((url, index) => (
                <img
                  src={`${url}`}
                  alt={game && game?.surname}
                  className="h-full w-full object-cover"
                />
              ))}
          </Carousel>
        </div>
        <div className="flex flex-col gap-4">
          <Card className="w-full lg:w-96">
            <CardBody className=" h-52 overflow-y-auto">
              <div className=" absolute top-44 left-0 right-0 h-8 bg_about_gradient"></div>
              <Typography variant="h4" className=" text-xl text-black">
                About
              </Typography>
              <Typography
                variant="p"
                className=" text-sm mt-2 font-normal text-gray-600"
              >
                {game && game?.desc}
              </Typography>
            </CardBody>
            <CardFooter className="pt-2">
              <Collapse open={open}>
                <div className=" flex flex-col items-start gap-1">
                  <Typography className=" text-sm font-semibold text-gray-800">
                    {`Released: ${game && game?.release}`}
                  </Typography>
                  <Typography className=" text-sm font-semibold text-gray-800">
                    {`Platforms: ${game && game?.platforms}`}
                  </Typography>
                  <Typography className=" text-sm font-semibold text-gray-800">
                    {`Genres: ${game && game?.genre}`}
                  </Typography>
                  <Typography className=" text-sm font-semibold text-gray-800">
                    {`Developers: ${game && game?.developers}`}
                  </Typography>
                  <Typography className=" text-sm font-semibold text-gray-800">
                    {`Publishers: ${game && game?.publishers}`}
                  </Typography>
                </div>
              </Collapse>
              <Button
                ripple={false}
                variant="text"
                fullWidth={true}
                className="px-2 flex justify-end capitalize items-center gap-1"
                onClick={toggleOpen}
              >
                {open ? "Hide" : "More"}
                <IoIosArrowDown
                  className={` text-lg ${
                    open ? " rotate-180" : "rotate-0"
                  } transition-all duration-200 ease-in-out`}
                />
              </Button>
            </CardFooter>
          </Card>
          {cart?.find((item) => item?._id === game?._id) ? (
            <Button
              fullWidth={true}
              className=" text-green-600 flex items-center justify-center gap-2"
            >
              Added
              <MdDone />
            </Button>
          ) : (
            <Button fullWidth={true} onClick={handleAddGame}>
              Add To Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;
