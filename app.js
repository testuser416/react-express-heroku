const path = require("path");
const express = require("express");
const app = express();
const multer = require("multer");
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const mongoose = require("mongoose");
const feedRoutes = require("./routes/feed");
const bodyParser = require("body-parser");
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(bodyParser.json()); // application/json
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});
app.use(feedRoutes);
const uri = process.env.MONGO_URI;
mongoose
  .connect(uri)
  .then((result) => {
    app.listen(4000);
  })
  .catch((error) => {
    console.log(error);
  });
