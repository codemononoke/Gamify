import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useCountries } from "use-react-countries";
import ChangeProfilePicture from "../../components/changeProfilePicture";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editProfileSchema } from "../../schema";
import { toast } from "react-hot-toast";
import { apiConnector } from "../../api/apiConnector";
import { settingEndpoints } from "../../api/apis";
import { setUser } from "../../redux/profileSlice";

const SettingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { access_token } = useSelector((state) => state.auth);
  const { countries } = useCountries();
  const [country, setCountry] = React.useState(0);
  const { name, flags, countryCallingCode } = countries[country];
  const [countryCode, setCountryCode] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editProfileSchema),
  });

  const formSubmit = async (data) => {
    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("gender", data.gender);
    formData.set("phoneNumber", `${countryCode}-${data.phoneNumber}`);
    formData.set("address", data.address);
    formData.set("city", data.city);
    formData.set("state", data.state);
    formData.set("pinCode", data.pinCode);
    const toastId = toast.loading("Updating...");
    try {
      const response = await apiConnector(
        "PUT",
        settingEndpoints.UPDATE_PROFILE_API,
        data,
        {
          Authorization: `Bearer ${access_token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.meg);
      }

      dispatch(setUser(response.data.updatedUserDetails));

      toast.success("Profile Updated Successfully");
      navigate("/profile");
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR........", error);
      toast.error(error);
    }
    toast.dismiss(toastId);
  };

  return (
    <div className=" w-full h-full flex flex-col gap-8 items-center justify-center px-4 lg:px-8 mt-[40px]">
      <Typography variant="h2" className=" text-2xl">
        Edit Profile
      </Typography>
      <Card color="transparent" shadow={false} className="items-center">
        <ChangeProfilePicture />
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-4">
            <div className=" flex items-center -mb-3 gap-3">
              <Typography variant="h6" color="blue-gray" className="">
                Name
              </Typography>
              {errors.name && (
                <p className=" text-sm text-red-600">{`(${errors.name?.message})`}</p>
              )}
            </div>
            <Input
              {...register("name")}
              size="lg"
              placeholder="John Deo"
              defaultValue={user && user?.name}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <div className=" flex items-center -mb-3 gap-3">
              <Typography variant="h6" color="blue-gray" className="">
                Gender
              </Typography>
              {errors.gender && (
                <p className=" text-sm text-red-600">{`(${errors.gender?.message})`}</p>
              )}
            </div>
            <Select
              name="gender"
              id="gender"
              size="lg"
              label="Select Gender"
              value={user && user?.additionalDetails?.gender}
              onChange={(value) => setValue("gender", value)}
            >
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Transgender">Transgender</Option>
              <Option value="Prefer not to respond">
                Prefer not to respond
              </Option>
            </Select>
            <div className=" flex items-center -mb-3 gap-3">
              <Typography variant="h6" color="blue-gray" className="">
                Phone No.
              </Typography>
              {errors.phoneNumber && (
                <p className=" text-sm text-red-600">{`(${errors.phoneNumber?.message})`}</p>
              )}
            </div>
            <div className="relative flex w-full max-w-[24rem]">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    ripple={false}
                    variant="text"
                    color="blue-gray"
                    className="flex h-11 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                  >
                    <img
                      src={flags.svg}
                      alt={name}
                      className="h-4 w-4 rounded-full object-cover"
                    />
                    {countryCallingCode}
                  </Button>
                </MenuHandler>
                <MenuList className="max-h-[20rem] max-w-[18rem]">
                  {countries.map(
                    ({ name, flags, countryCallingCode }, index) => {
                      return (
                        <MenuItem
                          key={name}
                          value={name}
                          className="flex items-center gap-2"
                          onClick={() => {
                            setCountry(index);
                            setCountryCode(countryCallingCode);
                          }}
                        >
                          <img
                            src={flags.svg}
                            alt={name}
                            className="h-5 w-5 rounded-full object-cover"
                          />
                          {name}{" "}
                          <span className="ml-auto">{countryCallingCode}</span>
                        </MenuItem>
                      );
                    }
                  )}
                </MenuList>
              </Menu>
              <Input
                {...register("phoneNumber")}
                type="tel"
                size="lg"
                placeholder="Phone Number"
                defaultValue={user && user?.additionalDetails?.phoneNumber}
                className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                containerProps={{
                  className: "min-w-0",
                }}
              />
            </div>
            <div className=" flex items-center -mb-3 gap-3">
              <Typography variant="h6" color="blue-gray" className="">
                Address
              </Typography>
              {errors.address && (
                <p className=" text-sm text-red-600">{`(${errors.address?.message})`}</p>
              )}
            </div>
            <Input
              {...register("address")}
              size="lg"
              placeholder=""
              defaultValue={user && user?.additionalDetails?.address}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <div className=" flex items-center -mb-3 gap-3">
              <Typography variant="h6" color="blue-gray" className="">
                City
              </Typography>
              {errors.city && (
                <p className=" text-sm text-red-600">{`(${errors.city?.message})`}</p>
              )}
            </div>
            <Input
              {...register("city")}
              size="lg"
              placeholder="City"
              defaultValue={user && user?.additionalDetails?.city}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <div className=" flex items-center -mb-3 gap-3">
              <Typography variant="h6" color="blue-gray" className="">
                State
              </Typography>
              {errors.state && (
                <p className=" text-sm text-red-600">{`(${errors.state?.message})`}</p>
              )}
            </div>
            <Input
              {...register("state")}
              size="lg"
              placeholder="State"
              defaultValue={user && user?.additionalDetails?.state}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <div className=" flex items-center -mb-3 gap-3">
              <Typography variant="h6" color="blue-gray" className="">
                Country
              </Typography>
              {errors.country && (
                <p className=" text-sm text-red-600">{`(${errors.country?.message})`}</p>
              )}
            </div>
            <Input
              {...register("country")}
              size="lg"
              placeholder="Country"
              defaultValue={user && user?.additionalDetails?.country}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <div className=" flex items-center -mb-3 gap-3">
              <Typography variant="h6" color="blue-gray" className="">
                Pin Code
              </Typography>
              {errors.pinCode && (
                <p className=" text-sm text-red-600">{`(${errors.pinCode?.message})`}</p>
              )}
            </div>
            <Input
              {...register("pinCode")}
              size="lg"
              placeholder=""
              defaultValue={user && user?.additionalDetails?.pinCode}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Update Profile
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SettingPage;
