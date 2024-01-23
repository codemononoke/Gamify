import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Avatar,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className=" w-full h-[calc(100vh-83.0667px)] flex flex-col gap-8 items-center justify-center px-4 lg:px-8">
      <Typography variant="h2" className=" text-2xl">
        Profile
      </Typography>
      <Card className="w-full max-w-96">
        <CardBody className=" flex items-center justify-center flex-col">
          <Avatar
            src={user && user?.profileImage}
            alt={user && user?.name}
            size="xl"
            withBorder={true}
            className="p-0.5"
          />

          <Typography variant="h3" className=" text-lg text-black">
            {user && user?.name}
          </Typography>
          <Typography variant="p" className=" text-sm text-gray-600 font-">
            {user && user?.email}
          </Typography>
          <div className=" w-full h-[2px] bg-gray-300 mt-4"></div>
          <div className="w-full flex flex-col items-start mt-6 gap-2">
            <Typography variant="h4" className=" text-sm">
              Gender:{" "}
              <span className=" text-black ml-2">
                {user?.additionalDetails?.gender
                  ? user?.additionalDetails?.gender
                  : "undefined"}
              </span>
            </Typography>
            <Typography variant="h4" className=" text-sm">
              Phone No.:{" "}
              <span className=" text-black ml-2">
                {user?.additionalDetails?.phoneNumber
                  ? user?.additionalDetails?.phoneNumber
                  : "undefined"}
              </span>
            </Typography>
            <Typography variant="h4" className=" text-sm">
              Address:
              <span className=" text-black ml-2">
                {user?.additionalDetails?.address
                  ? user?.additionalDetails?.address
                  : "undefined"}
              </span>
            </Typography>
            <Typography variant="h4" className=" text-sm">
              City:
              <span className=" text-black ml-2">
                {user?.additionalDetails?.city
                  ? user?.additionalDetails?.city
                  : "undefined"}
              </span>
            </Typography>
            <Typography variant="h4" className=" text-sm">
              State:
              <span className=" text-black ml-2">
                {user?.additionalDetails?.state
                  ? user?.additionalDetails?.state
                  : "undefined"}
              </span>
            </Typography>
            <Typography variant="h4" className=" text-sm">
              Country:
              <span className=" text-black ml-2">
                {user?.additionalDetails?.country
                  ? user?.additionalDetails?.country
                  : "undefined"}
              </span>
            </Typography>
            <Typography variant="h4" className=" text-sm">
              Pin Code:
              <span className=" text-black ml-2">
                {user?.additionalDetails?.pinCode
                  ? user?.additionalDetails?.pinCode
                  : "undefined"}
              </span>
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Link to="/edit-profile">
            <Button className=" w-full">Edit Profile</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfilePage;
