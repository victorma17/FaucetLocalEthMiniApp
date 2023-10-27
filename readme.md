** ethereum/client-go **


docker run --rm -it \
-v ${PWD}/data/keystore:/data \
ethereum/client-go:v1.11.0 account new \
--keystore data


docker run --rm -it \
-v ${PWD}/data:/data \
-v ${PWD}/genesis.json:/genesis.json \
ethereum/client-go:v1.11.0 init --datadir data /genesis.json

docker run -d -p 8545:8545 --name ethe-node-8888 -v ${PWD}/data:/data ethereum/client-go:v1.11.0 --datadir data --http --http.api persona,admin,eth,net,web3 --http.addr 0.0.0.0 --http.port 8545 --mine --miner.etherbase 0x61f9a204cf8a62436018f0abc2c110e879330150 --http.corsdomain="*" --miner.threads 1

** back **

yarn init -y
yarn add web3
yarn add express
yarn add web3
yarn add cors

curl localhost:3455/faucet/0x1157466D2Df9D52672e8a62E5e346e8d38B68b84
curl localhost:3455/balance/0x61f9a204cf8a62436018f0abc2c110e879330150

** front **

yarn create vite front --template react
yarn
yarn dev