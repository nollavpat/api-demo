const express = require('express');
const bodyParser = require('body-parser')
const Web3 = require('web3');

const Storage = require('./contracts/Storage.json');

// the port where our api will be served
const PORT = 3000;

// change this to the deployed address created by remix
const ADDRESS = '0x123405EC1a0f41870f1dbaBc9dfcCd00787C2379';


const app = express();
const web3 = new Web3("ws://localhost:8545"); // gnache default port
const storageContract = new web3.eth.Contract(
  Storage.abi,
  ADDRESS,
);

// parse application/json
app.use(bodyParser.json());

// serve static files (this will serve our frontend web page)
app.use(express.static('public'));

app.get('/api/value', async function (req, res) {
  try {
    const value = await storageContract.methods.retrieve().call();

    res.status(200).json({
      message: 'Successfully fetched the value.',
      value: value,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to fetch the value.'
    });
  }
});

app.post('/api/value', async function (req, res) {
  try {
    const {myAddress, value} = req.body;

    await storageContract.methods
        .store(Number(value)) // cast to uint256 min:0 max: 2^256-1
        .send({from: myAddress});

    res.status(200).json({
      message: 'Successfully stored the value.',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to update the value.'
    });
  }
});

app.listen(PORT, () => {
  console.log('Example app listening at http://localhost:' + PORT);
});