const mongoose = require("mongoose");
const { Schema } = mongoose;

const gamesSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  surname: {
    type: Schema.Types.String,
    required: true,
  },
  price: {
    type: Schema.Types.String,
    required: true,
  },
  desc: {
    type: Schema.Types.String,
    required: true,
  },
  link: {
    type: Schema.Types.String,
    required: true,
  },
  release: {
    type: Schema.Types.String,
    required: true,
  },
  platforms: {
    type: Schema.Types.String,
    required: true,
  },
  genre: {
    type: Schema.Types.String,
    required: true,
  },
  developers: {
    type: Schema.Types.String,
    required: true,
  },
  publishers: {
    type: Schema.Types.String,
    required: true,
  },
  rating: {
    type: Schema.Types.Number,
    required: true,
  },
  cover: {
    type: Schema.Types.String,
    required: true,
  },
  footage: {
    type: [Schema.Types.String],
    required: true,
  },
});

module.exports = mongoose.model("Games", gamesSchema);
