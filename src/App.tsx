import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Footer from './components/Footer';
import CryptoTable from './components/CryptoTable';
import CurrencyButtons from './components/CurrencyButtons';
import NonKYCBanner from './components/NonKYCBanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

interface Cryptocurrency {
  id: string;
  symbol: string;
}

const cryptocurrencies: Cryptocurrency[] = [
  { id: "conceal", symbol: "CCX" },
  { id: "bitcoin", symbol: "BTC" },
  { id: "tether", symbol: "USDT" },
  { id: "litecoin", symbol: "LTC" }
];
const currencies: string[] = ["USD", "EUR", "CAD", "JPY", "AUD"];

function App() {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [cryptoIcons, setCryptoIcons] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");

  useEffect(() => {
    fetchPrices();
    fetchCryptoIcons();
  }, [selectedCurrency]);

  const fetchPrices = async () => {
    setLoading(true);
    setError(null);
    try {
      const cryptoIds = cryptocurrencies.map(c => c.id).join(',');
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=${selectedCurrency.toLowerCase()}`);
      
      const newPrices: Record<string, number> = {};
      cryptocurrencies.forEach((crypto) => {
        newPrices[crypto.symbol] = response.data[crypto.id][selectedCurrency.toLowerCase()];
      });
      
      setPrices(newPrices);
    } catch (error) {
      console.error("Error fetching prices:", error);
      setError("Failed to fetch cryptocurrency prices. Please try again later.");
    }
    setLoading(false);
  };

  const fetchCryptoIcons = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          ids: cryptocurrencies.map(c => c.id).join(','),
          order: 'market_cap_desc',
          per_page: 100,
          page: 1,
          sparkline: false
        }
      });
      const icons: Record<string, string> = {};
      response.data.forEach((coin: any) => {
        icons[coin.symbol.toUpperCase()] = coin.image;
      });
      setCryptoIcons(icons);
    } catch (error) {
      console.error("Error fetching crypto icons:", error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <button className="dark-mode-switch" onClick={toggleDarkMode}>
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
      </button>
      <h1>Crypto Price Tracker</h1>
      {error && <p className="error-message">{error}</p>}
      <CurrencyButtons
        currencies={currencies}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <CryptoTable
          cryptocurrencies={cryptocurrencies}
          prices={prices}
          selectedCurrency={selectedCurrency}
          cryptoIcons={cryptoIcons}
        />
      )}
      <NonKYCBanner />
      <Footer />
    </div>
  );
}

export default App;