import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [cuenta, setCuenta] = useState(null)
  const [tx, setTx] = useState(null)
  const [saldo, setSaldo] = useState(null)

  useEffect(() => {
    window.ethereum.request({
      method: 'eth_requestAccounts'
    }).then(cuentas => {
      setCuenta(cuentas[0])
      window.ethereum.on('accountsChanged', (cuentas) => {
        setCuenta(cuentas[0])
      })
    })
  }, [])

  useEffect(() => {
    async function obtenerBalance() {
      // Exit if no account is set
      if (!cuenta) return;
      const url = `http://localhost:3455/balance/${cuenta}`;
      try {
        // Fetch the balance from our backend
        const response = await fetch(url);
        const json = await response.json();
        // Update the balance in our state
        setSaldo(json.balance / 1000000000000000000);
      } catch (err) {
        setError("Failed to fetch balance.");
        console.error(err);
      }
    }

    obtenerBalance();
  }, [cuenta]); // This useEffect runs whenever 'cuenta' changes



  async function invocarFaucet() {
    const url = `http://localhost:3455/faucet/${cuenta}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      setTx(json)
    } catch (err) {
      setError("Failed to send ethereum.");
      console.error(err);
    }
  }


  return (
    <div className="App">
    <h1> {cuenta} </h1>
    <h2> saldo: {saldo} </h2>
    <button onClick={() => invocarFaucet() }>Enviar 1 eth</button>
    <div>{JSON.stringify(tx, null, 4)} </div>
    </div>
  )
}

export default App