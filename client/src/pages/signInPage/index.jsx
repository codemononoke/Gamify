import React, { useEffect } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../schema";
import { toast } from "react-hot-toast";
import { setLoading, setUser } from "../../redux/profileSlice";
import { apiConnector } from "../../api/apiConnector";
import { authEndpoints } from "../../api/apis";
import { setAccessToken } from "../../redux/authSlice";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { access_token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  useEffect(() => {
    if (access_token && access_token !== null) {
      navigate("/");
    }
  }, [access_token, navigate]);

  const formSubmit = async (data) => {
    const toastId = toast.loading("Checking...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        authEndpoints.SIGNIN_API,
        data
      );
      console.log("SIGNIN API RESPONSE......", response);
      if (!response.data.success) {
        throw new Error(response.data.msg);
      }
      dispatch(setAccessToken(response.data.access_token));
      const userProfileImage = response?.data?.user?.profileImage
        ? response?.data?.user?.profileImage
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.name}`;
      dispatch(
        setUser({ ...response.data.user, profileImage: userProfileImage })
      );
      localStorage.setItem(
        "access_token",
        JSON.stringify(response.data.access_token)
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("SignIn Successful");
      navigate("/explore-games");
    } catch (error) {
      console.log("SIGNIN API ERROR.........", error);
      toast.error("SignIn Failed.");
      navigate("/");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };

  return (
    <div className=" w-full h-[calc(100vh-83.0667px)] flex items-center justify-between">
      <div className=" w-1/2 h-full  flex-1 hidden lg:flex">
        <img
          src="https://cdna.artstation.com/p/assets/images/images/015/906/610/large/jarlan-perez-asset.jpg?1552518804"
          alt=""
          className=" w-full h-full object-cover object-center"
        />
      </div>
      <div className=" flex items-center justify-center w-full h-full flex-1">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Welcome back! Enter your details to sign in.
          </Typography>
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-1 flex flex-col gap-4">
              <div className=" flex items-center -mb-3 gap-3">
                <Typography variant="h6" color="blue-gray" className="">
                  Your Email
                </Typography>
                {errors.email && (
                  <p className=" text-sm text-red-600">{`(${errors.email?.message})`}</p>
                )}
              </div>
              <Input
                {...register("email")}
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div className=" flex items-center -mb-3 gap-3">
                <Typography variant="h6" color="blue-gray" className="">
                  Password
                </Typography>
                {errors.password && (
                  <p className=" text-sm text-red-600">{`(${errors.password?.message})`}</p>
                )}
              </div>
              <Input
                {...register("password")}
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <Button type="submit" className="mt-6" fullWidth>
              sign in
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Don't have an account?{" "}
              <Link to="/sign-up" className="font-medium text-gray-900">
                Sign Up
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
