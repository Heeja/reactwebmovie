import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [numval, setNumval] = useState("");
  const [chngUSD, setChgUSD] = useState(true);

  const numChange = (e) => {
    setNumval(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setChgUSD(false);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  console.log(coins);

  return (
    <div>
      <h1>The Coin!</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <form onSubmit={onSubmit}>
          <input
            onChange={numChange}
            value={numval}
            type="number"
            placeholder="$000"
          />
          <button>Enter</button>
        </form>
      )}
      {chngUSD ? null : <p>{numval} USD로 살 수 있는 코인 수</p>}
      <ul>
        {coins.map((coin, index) => (
          <li key={index}>
            {coin.name} {coin.symbol}:
            {chngUSD ? (
              <span> ${coin.quotes.USD.price.toFixed(3)}</span>
            ) : (
              <span>
                {(coin.quotes.USD.price / numval).toFixed(3)} {coin.symbol}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
