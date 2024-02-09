const express = require("express");
const parser = require("body-parser");
const db = require("./connection");
const response = require("./response");
const app = express();
const port = 3000;

app.use(parser.json());

//routes

app.get("/", (req, res) => {
  db.query("SELECT * FROM idk", (error, result) => {
    response(200, result, "success", res);
  });
});

//by query
app.get("/query", (req, res) => {
  const q = req.query.id;
  const data = `SELECT * FROM idk WHERE id = ${q}`;
  db.query(data, (error, result) => {
    response(200, result, `your request to id = ${q}`, res);
  });
});

//by params
app.get("/:id", (req, res) => {
  res.send(`your request to params = ${req.params.id}`);
});

// app.get("/hoam", (req, res) => {
//   res.send("halo asdsa");
// });
// app.post("/bjir", (req, res) => {
//   console.log({ data: req.body });
//   res.send("meki");
// });

app.listen(port, () => {
  console.log(`welcome to port ${port}`);
});
