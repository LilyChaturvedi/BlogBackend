// *Dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Logger = require("./config/logger");
require("dotenv").config();
const app = express();

// *Imports Routes
const { authRoutes, blogRoutes } = require("./routes");

//  *MiddleWares
app.use(express.json());
app.use(cors());

//  *Routes
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

// *MongoDB Connection
mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => {
    console.info(`Connected To DataBase `);

    // *Server Connection
    app.listen(process.env.PORT || 5000, () => {
      console.info(`Server Started at port no:${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.log(typeof process.env.MONGOOSE_URL);
    console.error(`Error With DataBase Connection ${error}`);
  });
