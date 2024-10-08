import React from 'react';

interface Cryptocurrency {
  id: string;
  symbol: string;
}

interface CryptoTableProps {
  cryptocurrencies: Cryptocurrency[];
  prices: Record<string, number>;
  selectedCurrency: string;
  cryptoIcons: Record<string, string>;
}

const CryptoTable: React.FC<CryptoTableProps> = ({ cryptocurrencies, prices, selectedCurrency, cryptoIcons }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Cryptocurrency</th>
          <th>Price ({selectedCurrency})</th>
        </tr>
      </thead>
      <tbody>
        {cryptocurrencies.map((crypto) => (
          <tr key={crypto.symbol}>
            <td>
              {cryptoIcons[crypto.symbol] && (
                <img
                  src={cryptoIcons[crypto.symbol]}
                  alt={`${crypto.symbol} icon`}
                  className="crypto-icon"
                />
              )}
              {crypto.symbol}
            </td>
            <td>
              {typeof prices[crypto.symbol] === 'number'
                ? prices[crypto.symbol].toFixed(2)
                : 'N/A'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CryptoTable;