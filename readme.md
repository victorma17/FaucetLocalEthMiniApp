--
Delete data folder
Set wallet address like empty
--

Run Docker Desktop
Open your Metamask
set the wallet direction in genesis.json and save


** ethereum/client-go **

In terminal:

cd nodo

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

docker run -d -p 8545:8545 --name ethe-node-8888 -v ${PWD}/data:/data ethereum/client-go:v1.11.0 --datadir data --http --http.api persona,admin,eth,net,web3 --http.addr 0.0.0.0 --http.port 8545 --mine --miner.etherbase 0x0abf6d15320c366ba60bcdcc1b8e6b291d7cbf4c --http.corsdomain="*" --miner.threads 1

This could take some minutes, refresh cache in metamask and you will see the balance of your miner account

** back **

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

** front **
cd ..
cd front
yarn
yarn dev

// Enjoy!

```