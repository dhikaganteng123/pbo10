const express = require('express');
const bodyParser = require('body-parser');
const mahasiswaController = require('./controllers/mahasiswaController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Endpoint untuk Mahasiswa
app.use('./mahasiswa', mahasiswaController);

// Jalankan Server
app.listen(PORT, () => {
    console.log(Server is running on http://localhost:${PORT});
});