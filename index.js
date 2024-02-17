const express = require("express");
const parser = require("body-parser");
const db = require("./connection");
const response = require("./response");
const app = express();
const port = 3002;

app.use(parser.json());

//get method
app.get("/", (req, res) => {
  db.query("SELECT * FROM gudang_1", (error, result) => {
    response(200, result, "success", res);
  });
});

//get by query
app.get("/query", (req, res) => {
  const q = req.query.id;
  const data = `SELECT * FROM gudang_1 WHERE id = ${q}`;
  db.query(data, (error, result) => {
    response(200, result, `your requested to id = ${q}`, res);
  });
});

//get by params
app.get("/params/:id", (req, res) => {
  const params = req.params.id;
  const data = `SELECT * FROM gudang_1 WHERE id = ${params}`;
  db.query(data, (err, fields) => {
    response(200, fields, `your requested to params = ${params}`, res);
  });
});

//add new data
app.post("/send", (req, res) => {
  const { tanggal_shipping, tanggal_pengiriman, berat, alamat } = req.body;
  const sql = `INSERT INTO gudang_1 (tgl_shipping,tgl_pengiriman,berat,alamat) VALUES ('${tanggal_shipping}','${tanggal_pengiriman}','${berat}','${alamat}')`;
  db.query(sql, (err, fields) => {
    if (fields.affectedRows) {
      response(
        200,
        { sent: { tanggal_shipping, tanggal_pengiriman, berat, alamat } },
        "Data successfully sent",
        res
      );
    } else response(502, "bad traffic", "failed to send", res);
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
