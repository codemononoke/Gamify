import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";
import { apiConnector } from "../../api/apiConnector";
import { settingEndpoints } from "../../api/apis";
import { setUser } from "../../redux/profileSlice";
import { Card, Button, Avatar, Typography } from "@material-tailwind/react";

const ChangeProfilePicture = () => {
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const handleFileUpload = async () => {
    try {
      console.log("Uploading...");
      setLoading(true);
      const formData = new FormData();
      formData.append("profilePicture", imageFile);
      const toastId = toast.loading("Loading...");
      try {
        const response = await apiConnector(
          "PUT",
          settingEndpoints.UPDATE_PROFILE_PICTURE_API,
          formData,
          {
            "Content-Type": "multipart/form/data",
            Authorization: `Bearer ${access_token}`,
          }
        );
        if (!response.data.success) {
          throw new Error(response.data.msg);
        }
        toast.success("Profile Picture Updated Successfully");
        dispatch(setUser(response.data.data));
      } catch (error) {
        console.log("UPDATE_PROFILE_PICTURE_API API ERROR.........", error);
        toast.error("Could Not Update Profile Picture");
      }
      toast.dismiss(toastId);
      setLoading(false);
    } catch (error) {
      console.log("ERROR MESSAGE: ", error.message);
    }
  };

  return (
    <Card>
      <div
        className={` w-full flex items-center justify-between  py-8 px-6 lg:px-12`}
      >
        <div className={`flex items-center gap-x-4`}>
          <Avatar
            src={previewImage || user?.profileImage}
            alt={`profile-${user?.name}`}
            size="xl"
          />
          <div className={`space-y-2`}>
            <Typography
              variant="p"
              className={`text-md font-normal text-gray-900`}
            >
              Change Profile Picture
            </Typography>
            <div className={`flex flex-row gap-3`}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className={`hidden`}
                accept="image/png, image/gif, image/jpeg, image/jpg"
              />
              <Button disabled={loading} onClick={handleClick}>
                Select
              </Button>
              <Button
                color="yellow"
                className=" flex items-center gap-2"
                onClick={handleFileUpload}
              >
                {loading ? "Uploading..." : "Upload"}
                {!loading && <FiUpload className={`text-lg text-gray-900`} />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChangeProfilePicture;
