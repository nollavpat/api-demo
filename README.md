# api-demo
Demo of frontend, backend, and smart contract connection

### Install

- [Node 12.x.x](https://nodejs.org)
- [NPM 6.x.x](https://nodejs.org)

### Steps

- Running local blockchain network
```bash
# install ganache-cli
npm i ganache-cli

# run this command after installing, this will run a blockchain network on localhost:8545 and create 10 accounts
ganache-cli
```
![Screenshot](screenshots/ganache-cli.png)
- Compile and deploy [solidity file](contracts/Storage.sol) on remix
  1. Upload solidity file on remix and select it
  ![Screenshot](screenshots/deploy-contract-1.png)
  2. Compile selected solidity file
  ![Screenshot](screenshots/deploy-contract-2.png)
  3. Deploy the compiled contract and copy the address. <b>Update the address found on [index.js](index.js#11)</b>
  ![Screenshot](screenshots/deploy-contract-3.png)
  ![Screenshot](screenshots/deploy-contract-4.png)
- Run your backend on a different terminal window
```bash
npm install
npm start
```
- Open your frontend at http://localhost:3000


### Diagram
![Screenshot](screenshots/diagram.png)