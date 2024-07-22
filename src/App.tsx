import React, { useState, FormEvent } from 'react';
import logo from './logo.svg';
import './App.scss';

function App() {

  const [addressValue, setAddressValue] = useState("");

  //Function to handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddressValue(addressValue);
    if (addressValue) {
      getBalance(addressValue);
    } else {
      const resultElement = document.getElementById('result');
      if (resultElement) {
        resultElement.innerText = 'Please enter an Ethereum address';
      }
    }
  }

  function getBalance(addressValue: string) {
    const myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      "method": "eth_getBalance",
      "params": [addressValue, "latest"],
      "jsonrpc": "2.0",
      "id": 1
    });

    const requestOption = {
      method: 'POST',
      headers: myHeader,
      body: raw,
      redirect: 'follow'
    };
    
    const resultElement = document.getElementById('result');

    fetch("https://docs-demo.quiknode.pro/", requestOption as RequestInit)
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          let balanceInEther = parseInt(data.result, 16) / 1e18;
          let balanceFixed = balanceInEther.toFixed(2)
          if (resultElement)
            resultElement.innerText = `Balance: ${balanceFixed} ETH`;
        } else {
          if (resultElement)
            resultElement.innerText = 'Error fetching balance1';
        }
      })
      .catch(error => {
        if (resultElement)
          resultElement.innerText = 'Error fetching balance2';
        console.log('error', error);
      });
  }



  // // Function to fetch tokens
  // const fetchBalance = async () => {
  //   if (!utils.isAddress(address)) {
  //     alert('Please enter a valid Ethereum wallet address')
  //     return;
  //   }
  //   const provider = new ethers.providers.JsonRpcProvider("YOUR-QUICKNODE-HTTP-URL-HERE");
  //   const tokens = await provider.send("qn_getWalletTokenBalance", {
  //     wallet: address,
  //     contracts: [
  //       '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', //WETH
  //       '0xdAC17F958D2ee523a2206206994597C13D831ec7', //USDT
  //       '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0', //MATIC
  //       '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72', //ENS
  //     ]
  //   });
  //   return tokens
  // }


  return (
    <main className="main-section">
      <form
        onSubmit={handleSubmit}
        className="formsection">
        <input
          onChange={e => setAddressValue(e.target.value)}
          type="text"
          placeholder="Enter your Address here 🎯"
          className="formsection_input"
        />
        <button
          type='submit'
          className="formsection_button"
        >
          GO
        </button>
      </form>
      <div className='result' id="result"></div>
    </main>
  );
}

export default App;
