const express = require("express");
const router = express.Router();
const db = require("../models/db.js");


router.get("/", (req, res) => {
  db.query("SELECT * FROM mahasiswa", (error, results) => {
    if (error) {
      console.error("Erorr fetching mahasiswa:", error);
      res.status(500).json({ massage: "Internal Server Erorr" });
    } else {
      res.json(results);
    }
  });
});


router.get("/:nim", (req, res) => {
  const mahasiswaId = req.params.nim;

  db.query(
    "SELECT * FROM mahasiswa WHERE nim = ?",
    [mahasiswaId],
    (error, results) => {
      if (error) {
        console.error("Erorr fetching mahasiswa:", error);
        res.status(500).json({ massage: "Internal Server Erorr" });
      } else if (results.length === 0) {
        res.status(404).json({ massage: "Mahasiswa not found" });
      } else {
        res.json(results[0]);
      }
    }
  );
});

router.put("/:nim", (req, res) => {
  const mahasiswaNim = req.params.nim;
  const { nama, gender, prodi, alamat } = req.body;

  db.query(
    "UPDATE mahasiswa SET nama = ?, gender = ?, prodi = ?, alamat = ? WHERE nim = ?",
    [nama, gender, prodi, alamat, mahasiswaNim],
    (error) => {
      if (error) {
        console.error("Erorr updating mahasiswa:", error);
        res.status(500).json({ massage: "Internal Server Erorr" });
      } else {
        res.json("Updating mahasiswa Successfullys");
      }
    }
  );
});


router.post("/", (req, res) => {
  db.query("INSERT INTO mahasiswa SET ?", (error, results) => {
    if (error) {
      console.error("Error inserting mahasiswa:", error);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.json({ message: "Success", data: results });
    }
  });
});


router.delete("/:nim", (req, res) => {
  const mahasiswaNim = req.params.nim;

  db.query("DELETE FROM mahasiswa WHERE nim = ?", [mahasiswaNim], (error) => {
    if (error) {
      console.error("Error deleting mahasiswa:", error);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.json("Deleting mahasiswa Successfully");
    }
  });
});

module.exports = router;
