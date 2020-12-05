const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

let cars = [];
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get('/api/cars', function (req, res) {
  try {
    let carList = cars;

    if (req.query.sort) { // desc or asc
      carList = cars.sort(function (car1, car2) {
        if (req.query.sort === 'asc') {
          return car1.price - car2.price;
        }

        return car2.price - car1.price;
      });
    }

    res.status(200).json({
      message: 'Successfully retrieved cars',
      cars: cars,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({message: 'Failed to retrieve cars'});
  }
});

app.post('/api/cars', function (req, res) {
  try {
    console.log(req.body);

    cars.push(req.body);

    res.status(201).json({
      message: 'Successfully created a car',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({message: 'Failed to create a car'});
  }
});

app.patch('/api/cars/:id', function (req, res) {
  try {
    console.log(req.params)
    console.log(req.body);

    cars = cars.map(function (car) {
      if (car.id === req.params.id) {
        return {
          id: car.id,
          name: car.name,
          price: req.body.price,
        };
      }

      return car;
    });

    console.log(cars);

    res.status(200).json({
      message: 'Successfully updated a car:' + req.params.id,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({message: 'Failed to update a car'});
  }
});

app.put('/api/cars/:id', function (req, res) {
  try {
    console.log(req.params)
    console.log(req.body);

    cars = cars.map(function (car) {
      if (car.id === req.params.id) {
        return {
          id: car.id,
          name: req.body.name,
          price: req.body.price,
        };
      }

      return car;
    });

    console.log(cars);

    res.status(200).json({
      message: 'Successfully updated a car:' + req.params.id,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({message: 'Failed to update a car'});
  }
});

app.delete('/api/cars/:id', function (req, res) {
  try {
    console.log(req.params)

    cars = cars.filter(function (car) {
      if (car.id === req.params.id) {
        return false;
      }

      return true;
    });

    console.log(cars);

    res.status(200).json({
      message: 'Successfully deleted a car:' + req.params.id,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({message: 'Failed to delete a car'});
  }
});

const PORT = 8080; // the port where our api will be served

app.listen(PORT, function () {
  console.log('Example app listening at http://localhost:' + PORT);
});
