const express = require("express");
const path = require("path");
const app = express();

app.use("/src", express.static(__dirname + "/src/"));
app.set("view engine", "ejs");
express.static.mime.define({ "application/javascript": ["js", "json"] });

app.get(["/", "/index"], (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/compose", (req, res) => {
  res.sendFile(path.join(__dirname, "compose.html"));
});

app.get("/outbox", (req, res) => {
  res.sendFile(path.join(__dirname, "outbox.html"));
});

app.listen(8080, () => console.log("listening on port 8080"));
