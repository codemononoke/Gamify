import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { apiConnector } from "../../api/apiConnector";
import { authEndpoints } from "../../api/apis";
import { setAccessToken } from "../../redux/authSlice";
import { setUser } from "../../redux/profileSlice";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  if (!user) return null;

  const logout = async () => {
    try {
      await apiConnector("GET", authEndpoints.LOGOUT_API);
      dispatch(setAccessToken(null));
      dispatch(setUser(null));
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      toast.success("Logout Successful");
      navigate("/");
    } catch (error) {
      console.log("LOGOUT API ERROR.........", error);
      toast.error("Logout Failed.");
      navigate("/");
    }
  };

  return (
    <Menu>
      <MenuHandler>
        <Avatar src={user && user?.profileImage} alt="avatar" size="sm" />
      </MenuHandler>
      <MenuList>
        <Link to="/orders">
          <MenuItem>Orders</MenuItem>
        </Link>
        <Link to="/profile">
          <MenuItem>Profile</MenuItem>
        </Link>
        <MenuItem className=" text-red-600" onClick={() => logout()}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileDropdown;
