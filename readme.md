--
Delete data folder
Set wallet address like empty
--


# 👾 Ethereum Private Network Faucet


## Overview

This project is a part of the curriculum for the "FromWeb2toWeb3 Blockchain Eng. Master" course offered by [CodeCrypto Academy](https://codecrypto.academy/).

This repository contains instructions and code for setting up a faucet for a private Ethereum network. The faucet allows users to request and receive Ether (ETH) for testing and development purposes.

### App Architecture

The architecture of the app is given by codecrypto.academy, see the scheme below:

<figure><img src=".gitbook/assets/Screenshot 2023-09-16 at 4.45.11 PM.png" alt=""><figcaption><p>App Architecture, source: cedecrypto.academy</p></figcaption></figure>

### Prerequisites

Before you begin, ensure you have the following prerequisites installed:

1. **Docker**: Install Docker to set up a local Ethereum node with the desired network configuration.
2. **Metamask**: Ensure you have Metamask installed in your browser and configure it to connect to the Ethereum private network.

## Steps

Run Docker Desktop
Open your Metamask
**set the wallet direction in genesis.json and save**


### ethereum/client-go

In terminal:

cd nodo

// create an account

docker run --rm -it \
-v ${PWD}/data/keystore:/data \
ethereum/client-go:v1.11.0 account new \
--keystore data

// Set password: 1234 (for example)


docker run --rm -it \
-v ${PWD}/data:/data \
-v ${PWD}/genesis.json:/genesis.json \
ethereum/client-go:v1.11.0 init --datadir data /genesis.json

// Set your miner account (Could be the new account created before or one of your metamask to see the first results)

docker run -d -p 8545:8545 --name ethe-node-8888 -v ${PWD}/data:/data ethereum/client-go:v1.11.0 --datadir data --http --http.api persona,admin,eth,net,web3 --http.addr 0.0.0.0 --http.port 8545 --mine --miner.etherbase 0x1157466D2Df9D52672e8a62E5e346e8d38B68b84 --http.corsdomain="*" --miner.threads 1

This could take some minutes, refresh cache in metamask and you will see the balance of your miner account

### Back

cd ..
cd back
yarn init -y
yarn add web3
yarn add express
yarn add cors
npx nodemon app.js

// Now we go to Repeat the previous process first
Before, 
cd ..
cd nodo
and drop the container and data folder and take the address of the new account created and replace it in the same places as you set your previous account and go to the previous folder, rename the file created (UTC--... for account.json) and take the new wallet address (add an 0x where you paste it (genesis and comand))


//new terminal 
// direcion of the destiny of the funds from faucet account
curl localhost:3455/faucet/0x60f42cEa9684686bF059b0cFC015D40d99b0Bc31

//Remember to refresh the cache in metamask to see the balance of the new account, could take a minutes

curl localhost:3455/balance/0x72d9179482aD8bb260e606fAE92173c157F2820e

### Front
```
cd ..
cd front
yarn
yarn dev
```

### Enjoy! 🦹🏼‍♂️

