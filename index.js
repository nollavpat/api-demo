const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get('/api/cars', function (req, res) {});

app.post('/api/cars', function (req, res) {});

app.patch('/api/cars/:id', function (req, res) {});

app.put('/api/cars/:id', function (req, res) {});

app.delete('/api/cars/:id', function (req, res) {});

const PORT = 8080; // the port where our api will be served

app.listen(PORT, function () {
  console.log('Example app listening at http://localhost:' + PORT);
});
