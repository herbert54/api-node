const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all students
router.get('/students', (req, res) => {
  db.all("SELECT * FROM students", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST a new student
router.post('/students', (req, res) => {
  const { firstname, lastname, gender, age } = req.body;
  const sql = "INSERT INTO students (firstname, lastname, gender, age) VALUES (?, ?, ?, ?)";
  db.run(sql, [firstname, lastname, gender, age], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, message: "Estudiante creado correctamente" });
  });
});

// GET one student
router.get('/student/:id', (req, res) => {
  db.get("SELECT * FROM students WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: "Estudiante no encontrado" });
    res.json(row);
  });
});

// PUT update student
router.put('/student/:id', (req, res) => {
  const { firstname, lastname, gender, age } = req.body;
  const sql = `UPDATE students SET firstname = ?, lastname = ?, gender = ?, age = ? WHERE id = ?`;
  db.run(sql, [firstname, lastname, gender, age, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Estudiante actualizado correctamente" });
  });
});

// DELETE a student
router.delete('/student/:id', (req, res) => {
  db.run("DELETE FROM students WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: `Estudiante con id ${req.params.id} eliminado.` });
  });
});

module.exports = router;
