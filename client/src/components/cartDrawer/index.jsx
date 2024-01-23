import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Card,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { removeGame, setOpenCart } from "../../redux/cartSlice";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { openCart, cart } = useSelector((state) => state.cart);

  const closeDrawer = () => {
    dispatch(setOpenCart(false));
  };

  const handleRemoveGame = (game) => {
    dispatch(removeGame(game));
  };

  const totalPrice = cart.reduce((total, item) => total + item?.price * 1, 0);

  return (
    <React.Fragment>
      <Drawer
        placement="right"
        open={openCart}
        onClose={closeDrawer}
        className="p-4"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Cart
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        <div className=" w-full h-96 overflow-auto">
          {cart?.length === 0 && (
            <Typography variant="h4" className=" text-lg">
              No Game
            </Typography>
          )}
          {cart?.map((item, index) => (
            <Card
              key={index}
              className=" flex flex-row p-2 items-center justify-between mb-2"
            >
              <div className=" flex gap-2 ">
                <div className=" w-16 h-16 rounded-lg overflow-hidden">
                  <img
                    src={item?.cover}
                    alt={item?.surname}
                    className=" h-full w-full object-cover"
                  />
                </div>
                <div className=" flex flex-col items-start gap-1">
                  <Typography
                    variant="h3"
                    className=" text-sm text-black font-semibold"
                  >
                    {item?.name}
                  </Typography>
                  <Typography
                    variant="p"
                    className=" text-sm text-gray-600 font-medium"
                  >
                    ${item?.price}
                  </Typography>
                </div>
              </div>
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={() => handleRemoveGame(item)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </Card>
          ))}
        </div>
        <div className=" absolute left-0 right-0 bottom-4 px-4 flex  items-center justify-between">
          <Typography variant="h4" className=" text-md">
            {`Total: $${totalPrice.toFixed(2)}`}
          </Typography>
          <Link to={cart?.length > 0 ? "/checkout" : undefined} onClick={closeDrawer}>
            <Button className=" flex items-center gap-2 group">
              Checkout
              <FaArrowRightLong className=" group-hover:translate-x-2 transition-all duration-200 ease-in-out" />
            </Button>
          </Link>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default CartDrawer;
