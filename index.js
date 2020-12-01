const express = require('express');
const bodyParser = require('body-parser')
const Web3 = require('web3');

const {
	WEB3_USER,
	WEB3_PASSWORD,
	WEB3_PROVIDER,
} = process.env;

// Connection to chain
const web3 = new Web3(new Web3.providers.HttpProvider(
  `https://${WEB3_USER}:${WEB3_PASSWORD}@${WEB3_PROVIDER}`,
));

web3.eth.net.isListening()
  .then(function() {
    const app = express();

    // parse application/json
    app.use(bodyParser.json());

    app.get('/api/wallet/totalSupply', async function (req, res) {
      try {
        // insert code here

        res.status(200).json({
          message: 'Successfully retrieved total supply.',
          totalSupply: 200,
        });
      } catch (error) {
        console.error(error);

        res.status(500).json({
          message: 'Failed to retrieve total supply.'
        });
      }
    });

    app.get('/api/wallet/balances/:address', async function (req, res) {
      try {
        // insert code here

        res.status(200).json({
          message: 'Successfully retrieved balance.',
          balance: 10,
        });
      } catch (error) {
        console.error(error);

        res.status(500).json({
          message: 'Failed to retrieve balance.'
        });
      }
    });

    app.get('/api/wallet/allowances/:address', async function (req, res) {
      try {
        // insert code here

        res.status(200).json({
          message: 'Successfully retrieved allowance.',
          balance: 10,
        });
      } catch (error) {
        console.error(error);

        res.status(500).json({
          message: 'Failed to retrieve allowance.'
        });
      }
    });

    app.post('/api/wallet/transfer', async function (req, res) {
      try {
        // insert code here

        res.status(200).json({
          message: 'Successfully transferred funds.',
        });
      } catch (error) {
        console.error(error);

        res.status(500).json({
          message: 'Failed to transfer funds.'
        });
      }
    });

    app.post('/api/wallet/approve', async function (req, res) {
      try {
        // insert code here

        res.status(200).json({
          message: 'Successfully approve funds.',
        });
      } catch (error) {
        console.error(error);

        res.status(500).json({
          message: 'Failed to approve funds.'
        });
      }
    });

    const PORT = 3000; // the port where our api will be served

    app.listen(PORT, () => {
      console.log('Example app listening at http://localhost:' + PORT);
    });
  })
  .catch(function() {
    console.log('Connection to chain not established!');

    process.exit(1);
  });
