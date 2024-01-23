import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Badge,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

import { IoGameController, IoClose } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import ProfileDropdown from "../profileDropdown";
import { IoMdCart } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setOpenCart } from "../../redux/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { access_token } = useSelector((state) => state.auth);
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to="/" className="flex items-center">
          Genres
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to="/" className="flex items-center">
          Platforms
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to="/" className="flex items-center">
          Top Sellers
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to="/" className="flex items-center">
          Special Offers
        </Link>
      </Typography>
    </ul>
  );

  return (
    <div className="w-full h-full border-b-2 sticky top-0 left-0 right-0 z-10">
      <Navbar className="mx-auto  rounded-none px-4 py-2 lg:px-8 lg:py-4 shadow-none">
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          <Link to="/">
            <Typography
              as="a"
              href="#"
              className=" font-blackOps text-3xl flex items-center gap-2 mr-4 cursor-pointer py-1.5 font-medium"
            >
              <IoGameController />
              Gamify
            </Typography>
          </Link>
          <div className=" flex items-center gap-3">
            <div className=" flex items-center gap-3">
              <div className="hidden lg:block">{navList}</div>
              <div className=" w-0.5 h-5 bg-gray-400 hidden lg:block"></div>
              <Badge content={cart.length > 0 ? cart?.length:""} withBorder>
                <IconButton
                  className="rounded-full"
                  size="sm"
                  onClick={() => {
                    dispatch(setOpenCart(true));
                  }}
                >
                  <IoMdCart className=" text-xl" />
                </IconButton>
              </Badge>
              {!access_token && (
                <div className="flex items-center gap-x-1">
                  <Link to="/sign-in">
                    <Button
                      variant="text"
                      size="sm"
                      className="hidden lg:inline-block"
                    >
                      <span>Sign in</span>
                    </Button>
                  </Link>
                  <Link to="/sign-up">
                    <Button
                      variant="gradient"
                      size="sm"
                      className="hidden lg:inline-block"
                    >
                      <span>Sign up</span>
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <div className=" flex items-center gap-3">
              {access_token && <ProfileDropdown />}
              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <IoClose className=" text-3xl" />
                ) : (
                  <HiMenuAlt3 className=" text-3xl" />
                )}
              </IconButton>
            </div>
          </div>
        </div>
        <MobileNav open={openNav}>
          <div className="container mx-auto">
            {navList}
            {!access_token && (
              <div className="flex items-center gap-x-1">
                <Link to="/sign-in">
                  <Button fullWidth variant="text" size="sm" className="">
                    <span>Sign in</span>
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button fullWidth variant="gradient" size="sm" className="">
                    <span>Sign up</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
};

export default Header;
