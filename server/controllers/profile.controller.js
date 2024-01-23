const User = require("../models/user.model");
const Profile = require("../models/profile.model");
const asyncHandler = require("express-async-handler");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

const updateProfilePicture = asyncHandler(async (req, res) => {
  try {
    const profilePicture = req.files.profilePicture;
    const result = await uploadImageToCloudinary(
      profilePicture,
      "profile",
      1000,
      1000
    );
    console.log(result);

    const updateProfile = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { profileImage: result.secure_url },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: updateProfile,
      msg: "Image Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Something Wrong",
      error: error,
    });
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      gender,
      phoneNumber,
      address,
      city,
      state,
      country,
      pinCode,
    } = req.body;
    const userId = req.user.id;

    const userDetails = await User.findById(userId);
    const profile = await Profile.findById(userDetails.additionalDetails);

    const user = await User.findByIdAndUpdate(userId, {
      name,
    });

    await user.save();

    profile.gender = gender;
    profile.phoneNumber = phoneNumber;
    profile.address = address;
    profile.city = city;
    profile.state = state;
    profile.country = country;
    profile.pinCode = pinCode;

    await profile.save();

    const updatedUserDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      msg: "Profile Updated Successfully",
      updatedUserDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Something Wrong",
      error: error,
    });
  }
});

module.exports = { updateProfilePicture, updateProfile };
