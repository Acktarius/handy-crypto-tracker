import { Cryptocurrency } from '../App';

export class CryptoTable {
  static render(
    cryptocurrencies: Cryptocurrency[],
    prices: Record<string, number>,
    selectedCurrency: string,
    cryptoIcons: Record<string, string>
  ): string {
    return `
      <table>
        <thead>
          <tr>
            <th>Cryptocurrency</th>
            <th>Price (${selectedCurrency})</th>
          </tr>
        </thead>
        <tbody>
          ${cryptocurrencies.map((crypto, index) => `
            <tr>
              <td>
                ${cryptoIcons[crypto.symbol] ? `
                  <img
                    src="${cryptoIcons[crypto.symbol]}"
                    alt="${crypto.symbol} icon"
                    class="crypto-icon"
                  />
                ` : ''}
                ${crypto.symbol}
              </td>
              <td>
                ${typeof prices[crypto.symbol] === 'number'
                  ? prices[crypto.symbol].toFixed(2)
                  : 'N/A'}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
}