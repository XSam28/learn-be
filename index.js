const express = require("express");
const parser = require("body-parser");
const db = require("./connection");
const response = require("./response");
const app = express();
const port = 3000;

app.use(parser.json());

//get method
// app.get("/", (req, res) => {
//   db.query("SELECT * FROM idk", (error, result) => {
//     response(200, result, "success", res);
//   });
// });

//get by query
app.get("/query", (req, res) => {
  const q = req.query.id;
  const data = `SELECT * FROM idk WHERE id = ${q}`;
  db.query(data, (error, result) => {
    response(200, result, `your request to id = ${q}`, res);
  });
});

//get by params
app.get("/params/:id", (req, res) => {
  res.send(`your request to params = ${req.params.id}`);
});

//add new data
app.post("/send", (req, res) => {
  const { kode, judul, pengarang, penerbit, tahun } = req.body;
  const sql = `INSERT INTO idk (kode_buku,judul_buku,pengarang,penerbit,tahun_terbit) VALUES ('${kode}','${judul}','${pengarang}','${penerbit}',${tahun})`;
  db.query(sql, (err, fields) => {
    console.log(err);
    if (fields.affectedRows) {
      console.log("masuk wir");
    } else console.log("failed to send");
  });
});

//edit rows, without adding new data
app.put("/updateme", (req, res) => {
  const { id, kode, judul, pengarang, penerbit, tahun } = req.body;
  const sql = `UPDATE idk SET kode_buku='${kode}',judul_buku='${judul}',pengarang='${pengarang}',penerbit='${penerbit}',tahun_terbit=${tahun} WHERE id = ${id}`;
  db.query(sql, (err, fields) => {
    if (!err) {
      response(
        200,
        { peki: { kode, judul, pengarang, penerbit, tahun } },
        `fields ${id} updated`,
        res
      );
    }
  });
});

//delete rows
app.delete("/del", (req, res) => {
  const sql = `DELETE FROM idk WHERE id=${req.query.id}`;
  db.query(sql, (err, fields) => {
    if (fields?.affectedRows)
      response(
        200,
        { fields },
        `you've been delete field ${req.query.id}`,
        res
      );
    else response(404, "nth", "nth", res);
  });
});
//port
app.listen(port, () => {
  console.log(`welcome to port ${port}`);
});
