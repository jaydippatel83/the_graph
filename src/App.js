
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [data,setData]=useState([]);
  async function getFlashloanData() {

   try {
    const result = await axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
    {
      query: `
      {
        pairs (first:10,skip:10){
          token0{
            symbol
          }
          token1{
            symbol
          }
          reserveETH
          reserveUSD
          volumeUSD
        }
      }
    `
    }
  );
  setData(result.data.data.pairs);
  console.log(result,"resulr");
   } catch (error) {
     console.error(error);
   }
  }

  useEffect(() => {
    getFlashloanData();
  }, []) 

  return (
    <div className="App">
      <header className="App-header">
        <h1>The Graph</h1>

        {
          data && data.map((e,i)=>{
            return(
              <div key={i}>
                <h5>Reserve ETH: {e.reserveETH}</h5>
                <h5>Reserve USD: {e.reserveUSD}</h5>
                <h5>token0 symbol : {e.token0.symbol}</h5>
                <h5>token1 symbol: {e.token1.symbol}</h5>
                <h5>volumeUSD : {e.volumeUSD}</h5>
              </div>
            );
          })
        }
      </header>
    </div>
  );
}

export default App;
