const router = require("express").Router();
const {
  updateProfilePicture,
  updateProfile,
} = require("../controllers/profile.controller");
const { getAccessToRoute } = require("../middleware/auth");

router.put("/updateProfilePicture", getAccessToRoute, updateProfilePicture);
router.put("/updateProfile", getAccessToRoute, updateProfile);

module.exports = router;
