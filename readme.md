# 👾 Ethereum Private Network Faucet 👾

All code is executed in a Mac OS Sonoma 14.0

## Overview

This project is a part of the curriculum for the "FromWeb2toWeb3 Blockchain Eng. Master" course offered by [CodeCrypto Academy](https://codecrypto.academy/).

This repository contains instructions and code for setting up a faucet for a private Ethereum network. The faucet allows users to request and receive Ether (ETH) for testing and development purposes.

### App Architecture

The architecture of the app is given by codecrypto.academy,  see the scheme below:

<figure><img src="arc.png" alt=""><figcaption><p>App Architecture, source: cedecrypto.academy</p></figcaption></figure>

### Prerequisites

Before you begin, ensure you have the following prerequisites installed:

1. **Docker**: Install Docker to set up a local Ethereum node with the desired network configuration.
2. **Metamask**: Ensure you have Metamask installed in your browser and configure it to connect to the Ethereum private network.

## Steps

Run Docker Desktop

Open your Metamask

**Set YOUR wallet direction in nodo/genesis.json and Save It**


### ethereum/client-go

In terminal:


```
cd nodo

docker run --rm -it \
-v ${PWD}/data:/data \
-v ${PWD}/genesis.json:/genesis.json \
ethereum/client-go:v1.11.0 init --datadir data /genesis.json
```

```
// Set  your metamask to see the first results and if it works

docker run -d -p 8545:8545 --name ethe-node-8888 -v ${PWD}/data:/data ethereum/client-go:v1.11.0 \
--datadir data --http --http.api persona,admin,eth,net,web3 --http.addr 0.0.0.0 --http.port 8545 \
--mine --miner.etherbase <<Your 0x Wallet Account >> --http.corsdomain="*" --miner.threads 1
```

**Reset web explorer and Metamask**

```
// create an account

docker run --rm -it \
-v ${PWD}/data/keystore:/data \
ethereum/client-go:v1.11.0 account new \
--keystore data

// Set password: 1234 (if you prefer another, remember change it also in Back module)

This could take some minutes, refresh cache in metamask or the entire explorer and 
you will see the balance of your miner account, 
or try to make some fake transaction to force Metamask to fetch the balance.
```
**Set the NEW wallet direction in nodo/genesis.json and Save It**

The new account will be the Faucet miner

Rename the file created (UTC--... for account.json) and take the new wallet address (add an 0x where you paste it (genesis and comand))

### Back

```
cd ..
cd back
yarn init -y
yarn add web3
yarn add express
yarn add cors
npx nodemon app.js
```

```
//new terminal 
// direcion of the destiny of the funds from faucet account
curl localhost:3455/faucet/<<Your 0x Wallet Account >>

//Remember to refresh the cache in metamask or the entire explorer to see the balance of the new account, could take a minutes

curl localhost:3455/balance/<<Your 0x Wallet Account >>
```

### Front

```
cd ..
cd front
yarn
yarn dev
```

### Enjoy! 🦹🏼‍♂️
