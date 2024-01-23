import React, { useEffect } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../schema";
import { toast } from "react-hot-toast";
import { setLoading, setSignUpData } from "../../redux/authSlice";
import { apiConnector } from "../../api/apiConnector";
import { authEndpoints } from "../../api/apis";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { access_token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  useEffect(() => {
    if (access_token && access_token !== null) {
      navigate("/");
    }
  }, [access_token, navigate]);

  const formSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password are not matching.");
      return;
    }

    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        authEndpoints.SIGNUP_API,
        data
      );

      if (!response.data.success) {
        throw new Error(response.data.msg);
      }
      dispatch(setSignUpData(response.data.user));
      toast.success("SignUp Successful");
      navigate("/sign-in");
    } catch (error) {
      console.log("SIGNUP API ERROR.........", error);
      toast.error("SignUp Failed.");
      navigate("/sign-up");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
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
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to register.
          </Typography>
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-1 flex flex-col gap-4">
              <div className=" flex items-center -mb-3 gap-3">
                <Typography variant="h6" color="blue-gray" className="">
                  Your Name
                </Typography>
                {errors.name && (
                  <p className=" text-sm text-red-600">{`(${errors.name?.message})`}</p>
                )}
              </div>
              <Input
                {...register("name")}
                size="lg"
                placeholder="John Deo"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
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
              <div className=" flex items-center -mb-3 gap-3">
                <Typography variant="h6" color="blue-gray" className="">
                  Confirm Password
                </Typography>
                {errors.confirmPassword && (
                  <p className=" text-sm text-red-600">{`(${errors.confirmPassword?.message})`}</p>
                )}
              </div>
              <Input
                {...register("confirmPassword")}
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
              sign up
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link to="/sign-in" className="font-medium text-gray-900">
                Sign In
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
