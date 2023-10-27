const { Web3 } = require("web3")
const fs = require("fs")
const cors = require("cors")
const express = require("express")

const app = express()
const web3 = new Web3("http://localhost:8545")
const json = JSON.parse(fs.readFileSync("../nodo/data/keystore/account.json"))

app.use(cors)
app.listen(3455)

app.get("/balance/:address", async (req, res) => {
  try {
    const balance = await web3.eth.getBalance(req.params.address)
    res.json({ balance: balance.toString() }) // Convert BigInt to string
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to retrieve balance" })
  }
})

// API endpoint to send ether from the faucet to the specified address
app.get("/faucet/:address", async (req, res) => {
  try {
    const account = await web3.eth.accounts.decrypt(json, "1234")
    const tx = {
      chainId: 8888,
      to: req.params.address,
      from: account.address,
      gas: 30,
      value: web3.utils.toWei("1000", "ether"),
      gasPrice: 1,
      gasLimit: 500000
    }
    // signed the transaction
    const txSigned = await account.signTransaction(tx)
    // send the aswaer of the transaction
    const receipt = await web3.eth.sendSignedTransaction(txSigned.rawTransaction)
    res.json({ transactionHash: receipt.transactionHash })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to send ether" })
  }
})