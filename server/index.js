const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./db");
const routesRouter = require("./routes/routes");

const app = express();
const apiPort = 4000;

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(cors());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", routesRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
