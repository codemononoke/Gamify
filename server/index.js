require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const connectDB = require("./config/db");
const seedGames = require("./utils/seeder");
const cloudinary = require("cloudinary").v2;

const app = express();

app.use(
  cors({
    origin: "https://gamify-pp891.netlify.app",
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.use("/api/v1/auth", require("./routes/auth.route"));
app.use("/api/v1/profile", require("./routes/profile.route"));
app.use("/api/v1/games", require("./routes/games.route"));
app.use("/api/v1/order", require("./routes/order.route"));
app.use("/api/v1/payment", require("./routes/payment.route"));

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log(`Server is setup on http://localhost:${PORT}`);
  connectDB();
  seedGames();
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
