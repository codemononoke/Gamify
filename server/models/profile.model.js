const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema({
  gender: {
    type: Schema.Types.String,
  },
  address: {
    type: Schema.Types.String,
  },
  city: {
    type: Schema.Types.String,
  },
  state: {
    type: Schema.Types.String,
  },
  country: {
    type: Schema.Types.String,
  },
  pinCode: {
    type: Schema.Types.Number,
    minLength: 6,
    maxLength: 6,
  },
  phoneNumber: {
    type: Schema.Types.Number,
    minLength: 10,
    maxLength: 10,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
