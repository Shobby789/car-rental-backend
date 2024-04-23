const express = require("express");
const { DBConnection } = require("./models/dbconnection");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
require("dotenv").config();
DBConnection();
require("./models/userSchema");
const PORT = process.env.PORT;

app.use("/api", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
