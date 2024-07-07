const express = require("express");
const app = express();
const db = require("./db");

const cors = require('cors');
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Import the routes
const studentRoutes = require("./routes/studentRoutes");

// Use the routes
app.use("/", studentRoutes);

app.listen(3001, () => {
  console.log("listening on port 3001");
});
