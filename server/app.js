var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3001;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var therapistRouter = require("./routes/therapists");
var generateRouter = require("./routes/generate");

var app = express();

const mongoUri = 'mongodb+srv://m001-student:m001-mongodb-basics2@sandbox.f7rmphl.mongodb.net/OkTherapy?retryWrites=true&w=majority&appName=Sandbox';
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/therapists", therapistRouter);
app.use("/generate", generateRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../frontend/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});

module.exports = app;
