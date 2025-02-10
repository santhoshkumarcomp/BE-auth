const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3001, () => {
      console.log("Server running on port 3001");
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error.message);
  });
