require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = () => {
  const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;

  mongoose
    .connect(
      `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@ac-qs0ba1c-shard-00-00.q4olygd.mongodb.net:27017,ac-qs0ba1c-shard-00-01.q4olygd.mongodb.net:27017,ac-qs0ba1c-shard-00-02.q4olygd.mongodb.net:27017/?ssl=true&replicaSet=atlas-cb8te4-shard-0&authSource=admin&retryWrites=true&w=majority`
    )
    .then(() => {
      console.log(`Database os setup on ${mongoose.connection.host}`);
    })
    .catch((error) => {
      console.log("Database connection failed!");
      console.error(error);
      process.exit(1);
    });
};

module.exports = connectDB;
