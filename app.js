//Import packages
const express = require("express");
const cors = require("cors");
require("dotenv/config");
require("dotenv").config();

//routers
const applicationRouter = require("./routes/application");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/application", applicationRouter);

app.get("/", (_, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  res.send("Welcome to the api of the Escape dance studio");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started"));
