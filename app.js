const express = require('express');
const bodyParser = require('body-parser');
const studentsRoutes = require('./routes/students');

const app = express();
const PORT = 8001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', studentsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});
